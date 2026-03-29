import { computed, useEffect, type HostElement } from '@aria-ui-v2/core'
import { computePosition, offset } from '@floating-ui/dom'
import { isHTMLElement } from '@ocavue/utils'
import type { Editor } from '@prosekit/core'
import type { EditorView } from '@prosekit/pm/view'

import { assignStyles } from '../../utils/assign-styles.ts'
import { getSafeEditorView } from '../../utils/get-safe-editor-view.ts'

import { tableHandleStoreContext } from './store.ts'

export type OnInitParams = {
  host: HostElement
  direction: 'row' | 'col'
  dragging: boolean
  draggingIndex: number
  table: HTMLTableElement
  cell: HTMLTableCellElement
}

export function useInitDndPosition(
  host: HostElement,
  getEditor: () => Editor | null,
  onInit: (params: OnInitParams) => void,
): void {
  const getStore = tableHandleStoreContext.consume(host)

  const getDragging = computed(() => getStore()?.dnd.get().dragging ?? false)
  const getDirection = computed(() => getStore()?.dnd.get().direction ?? 'row')
  const getDraggingIndex = computed(() => getStore()?.dnd.get().draggingIndex ?? -1)

  useEffect(host, () => {
    const view = getSafeEditorView(getEditor())
    if (!view) return

    const dragging = getDragging()
    const direction = getDirection()

    host.dataset.direction = direction
    host.dataset.dragging = dragging.toString()

    const draggingIndex = getDraggingIndex()

    const relatedDOMs = getDndRelatedDOMs(view, getStore()?.getHoveringCell()?.cellPos, draggingIndex, direction)
    if (!relatedDOMs) return
    const { table, cell } = relatedDOMs

    onInit({
      host,
      direction,
      dragging,
      draggingIndex,
      table,
      cell,
    })

    if (!dragging) return

    let cancelled = false

    void computePosition(cell, host, {
      placement: direction === 'row' ? 'right' : 'bottom',
      middleware: [
        offset(({ rects }) => {
          if (direction === 'col') {
            return -rects.reference.height
          }
          return -rects.reference.width
        }),
      ],
    }).then(({ x, y }) => {
      if (cancelled) return
      assignStyles(host, {
        left: `${x}px`,
        top: `${y}px`,
      })
    })

    return () => {
      cancelled = true
    }
  })
}

function getTableDOMByPos(view: EditorView, pos: number): HTMLTableElement | undefined {
  const dom = view.domAtPos(pos).node
  if (!dom) return
  const element = isHTMLElement(dom) ? dom : dom.parentElement
  const table = element?.closest('table')
  return table ?? undefined
}

function getTargetFirstCellDOM(table: HTMLTableElement, index: number, direction: 'row' | 'col'): HTMLTableCellElement | undefined {
  if (direction === 'row') {
    const row = table.querySelectorAll('tr')[index]
    const cell = row?.querySelector<HTMLTableCellElement>('td, th')
    return cell ?? undefined
  } else {
    const row = table.querySelector('tr')
    const cell = row?.querySelectorAll<HTMLTableCellElement>('td, th')[index]
    return cell ?? undefined
  }
}

export function getDndRelatedDOMs(
  view: EditorView,
  cellPos: number | undefined,
  draggingIndex: number,
  direction: 'row' | 'col',
): { table: HTMLTableElement; cell: HTMLTableCellElement } | undefined {
  if (cellPos == null) return
  const table = getTableDOMByPos(view, cellPos)
  if (!table) return
  const cell = getTargetFirstCellDOM(table, draggingIndex, direction)
  if (!cell) return
  return { table, cell }
}

import {
  createComputed,
  useEffect,
  type ConnectableElement,
  type ReadonlySignal,
} from '@aria-ui/core'
import {
  computePosition,
  offset,
} from '@floating-ui/dom'
import { isHTMLElement } from '@ocavue/utils'
import type { Editor } from '@prosekit/core'
import type { EditorView } from '@prosekit/pm/view'

import {
  tableHandleDndContext,
  tableHandleRootContext,
} from './context'

export type OnInitParams = {
  host: ConnectableElement
  direction: 'row' | 'col'
  dragging: boolean
  draggingIndex: number
  table: HTMLTableElement
  cell: HTMLTableCellElement
}

export function useInitDndPosition(
  host: ConnectableElement,
  editor: ReadonlySignal<Editor | null>,
  onInit: (params: OnInitParams) => void,
): void {
  const dndContext = tableHandleDndContext.consume(host)
  const rootContext = tableHandleRootContext.consume(host)

  const draggingSignal = createComputed(() => {
    const context = dndContext.get()
    return context.dragging
  })

  const directionSignal = createComputed(() => {
    const context = dndContext.get()
    return context.direction
  })

  const draggingIndexSignal = createComputed(() => {
    const context = dndContext.get()
    return context.draggingIndex
  })

  useEffect(host, () => {
    let cancelled = false
    const editorInstance = editor.get()
    if (!editorInstance) return

    const dragging = draggingSignal.get()
    const direction = directionSignal.get()

    host.dataset.direction = direction
    host.dataset.dragging = dragging.toString()

    const draggingIndex = draggingIndexSignal.get()
    const { view } = editorInstance

    const relatedDOMs = getDndRelatedDOMs(view, rootContext.peek()?.cellPos, draggingIndex, direction)
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

    computePosition(cell, host, {
      placement: direction === 'row' ? 'right' : 'bottom',
      middleware: [offset(({ rects }) => {
        if (direction === 'col') {
          return -rects.reference.height
        }

        return -rects.reference.width
      })],
    })
      .then(({ x, y }) => {
        if (cancelled) return
        Object.assign(host.style, {
          left: `${x}px`,
          top: `${y}px`,
        })
      })
      .catch((error) => {
        if (cancelled) return
        console.error(error)
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
  const rows = table.querySelectorAll('tr')
  if (index < 0 || index >= rows.length) return undefined

  if (direction === 'row') {
    const row = rows[index]
    const cell = row.querySelector('td')
    return cell ?? undefined
  }

  const row = rows[0]
  const cell = row.querySelectorAll('td')[index]
  return cell ?? undefined
}

export function getDndRelatedDOMs(view: EditorView, cellPos: number | undefined, draggingIndex: number, direction: 'row' | 'col'): { table: HTMLTableElement; cell: HTMLTableCellElement } | undefined {
  if (cellPos == null) return
  const table = getTableDOMByPos(view, cellPos)
  if (!table) return
  const cell = getTargetFirstCellDOM(table, draggingIndex, direction)
  if (!cell) return
  return { table, cell }
}

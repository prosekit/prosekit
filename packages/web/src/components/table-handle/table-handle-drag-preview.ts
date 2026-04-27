import {
  defineCustomElement,
  defineProps,
  registerCustomElement,
  useEffect,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type State,
} from '@aria-ui/core'
import { computePosition, type ReferenceElement } from '@floating-ui/dom'
import type { Editor } from '@prosekit/core'

import { assignStyles } from '../../utils/assign-styles.ts'
import { getSafeEditorView } from '../../utils/get-safe-editor-view.ts'

import { getDndRelatedDOMs, useInitDndPosition, type OnInitParams } from './dnd.ts'
import { clearPreviewDOM, createPreviewDOM } from './render-preview.ts'
import { tableHandleStoreContext } from './store.ts'

export interface TableHandleDragPreviewProps {
  /**
   * @default null
   * @hidden
   */
  editor: Editor | null
}

/** @internal */
export const TableHandleDragPreviewPropsDeclaration: PropsDeclaration<TableHandleDragPreviewProps> = defineProps<
  TableHandleDragPreviewProps
>({
  editor: { default: null, attribute: false },
})

/**
 * @internal
 */
export function setupTableHandleDragPreview(
  host: HostElement,
  props: State<TableHandleDragPreviewProps>,
): void {
  const getEditor = props.editor.get

  useEffect(host, () => {
    assignStyles(host, {
      position: 'absolute',
      pointerEvents: 'none',
    })
  })

  useInitDndPosition(host, getEditor, onInitPreviewPosition)

  useUpdatePreviewPosition(host, getEditor)
}

function onInitPreviewPosition({ host, direction, dragging, table, cell, draggingIndex }: OnInitParams): void {
  assignStyles(host, {
    display: dragging ? 'block' : 'none',
  })

  if (!dragging) {
    clearPreviewDOM(host)
    return
  }

  createPreviewDOM(table, host, draggingIndex, direction)

  const tableRect = table.getBoundingClientRect()
  const cellRect = cell.getBoundingClientRect()

  if (direction === 'col') {
    assignStyles(host, {
      width: `${cellRect.width}px`,
      height: `${tableRect.height}px`,
    })
  }

  if (direction === 'row') {
    assignStyles(host, {
      width: `${tableRect.width}px`,
      height: `${cellRect.height}px`,
    })
  }
}

function useUpdatePreviewPosition(host: HostElement, getEditor: () => Editor | null): void {
  const getStore = tableHandleStoreContext.consume(host)

  useEffect(host, () => {
    const view = getSafeEditorView(getEditor())
    if (!view) return

    const store = getStore()
    if (!store) return
    const dndStore = store.dndStore

    if (!dndStore.dragging.get()) return

    const draggingIndex = dndStore.draggingIndex.get()
    const direction = dndStore.direction.get()
    const x = dndStore.x.get()
    const y = dndStore.y.get()

    const relatedDOMs = getDndRelatedDOMs(view, store.getReferenceCell()?.cellPos, draggingIndex, direction)
    if (!relatedDOMs) return
    const { cell } = relatedDOMs

    let cancelled = false

    void computePosition(
      getVirtualElement(cell, x, y),
      host,
      { placement: direction === 'row' ? 'right' : 'bottom' },
    ).then(({ x, y }) => {
      if (cancelled) return

      if (direction === 'row') {
        assignStyles(host, { top: `${y}px` })
        return
      }

      if (direction === 'col') {
        assignStyles(host, { left: `${x}px` })
        return
      }
    })

    return () => {
      cancelled = true
    }
  })
}

function getVirtualElement(cell: HTMLTableCellElement, x: number, y: number): ReferenceElement {
  return {
    contextElement: cell,
    getBoundingClientRect: () => {
      const rect = cell.getBoundingClientRect()
      return {
        width: rect.width,
        height: rect.height,
        right: x + rect.width / 2,
        bottom: y + rect.height / 2,
        top: y - rect.height / 2,
        left: x - rect.width / 2,
        x: x - rect.width / 2,
        y: y - rect.height / 2,
      }
    },
  }
}

const TableHandleDragPreviewElementBase: HostElementConstructor<TableHandleDragPreviewProps> = defineCustomElement(
  setupTableHandleDragPreview,
  TableHandleDragPreviewPropsDeclaration,
)

/**
 * `<prosekit-table-handle-drag-preview>` custom element.
 *
 * Properties: {@link TableHandleDragPreviewProps}
 */
export class TableHandleDragPreviewElement extends TableHandleDragPreviewElementBase {}

/**
 * @internal
 */
export function registerTableHandleDragPreviewElement(): void {
  registerCustomElement('prosekit-table-handle-drag-preview', TableHandleDragPreviewElement)
}

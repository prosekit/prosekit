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
import { computePosition, offset } from '@floating-ui/dom'
import type { Editor } from '@prosekit/core'
import type { defineTableCommands } from '@prosekit/extensions/table'

import { assignStyles } from '../../utils/assign-styles.ts'
import { getSafeEditorView } from '../../utils/get-safe-editor-view.ts'

import { getDragOverColumn, getDragOverRow } from './calc-drag-over.ts'
import { getDndRelatedDOMs, useInitDndPosition, type OnInitParams } from './dnd.ts'
import { tableHandleStoreContext } from './store.ts'

type TableCommandsExtension = ReturnType<typeof defineTableCommands>

const HANDLE_WIDTH = 2

export interface TableHandleDropIndicatorProps {
  /**
   * @default null
   * @hidden
   */
  editor: Editor<TableCommandsExtension> | null
}

/** @internal */
export const TableHandleDropIndicatorPropsDeclaration: PropsDeclaration<TableHandleDropIndicatorProps> = defineProps<
  TableHandleDropIndicatorProps
>({
  editor: { default: null, attribute: false, type: 'json' },
})

/**
 * @internal
 */
export function setupTableHandleDropIndicator(
  host: HostElement,
  props: State<TableHandleDropIndicatorProps>,
): void {
  const getEditor = props.editor.get

  useEffect(host, () => {
    assignStyles(host, {
      pointerEvents: 'none',
      position: 'absolute',
    })
  })

  useInitDndPosition(host, getEditor, onInitIndicatorPosition)

  useUpdateIndicatorPosition(host, getEditor, HANDLE_WIDTH)
}

function onInitIndicatorPosition({ host, direction, dragging, table }: OnInitParams): void {
  assignStyles(host, {
    display: dragging ? 'block' : 'none',
  })

  const tableRect = table.getBoundingClientRect()

  if (direction === 'col') {
    assignStyles(host, {
      width: `${HANDLE_WIDTH}px`,
      height: `${tableRect.height}px`,
    })
  }

  if (direction === 'row') {
    assignStyles(host, {
      width: `${tableRect.width}px`,
      height: `${HANDLE_WIDTH}px`,
    })
  }
}

function useUpdateIndicatorPosition(host: HostElement, getEditor: () => Editor | null, handleWidth: number): void {
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
    const { table } = relatedDOMs

    let cancelled = false
    const cleanup = () => {
      cancelled = true
    }

    if (direction === 'col') {
      const dir = dndStore.startX.get() > x ? 'left' : 'right'
      const dragOverColumn = getDragOverColumn(table, x)

      if (dragOverColumn) {
        const [col, index] = dragOverColumn
        dndStore.droppingIndex.set(index)
        void computePosition(col, host, {
          placement: dir === 'left' ? 'left' : 'right',
          middleware: [offset(dir === 'left' ? -1 * handleWidth : 0)],
        }).then(({ x }) => {
          if (cancelled) return
          assignStyles(host, { left: `${x}px` })
        })
      }

      return cleanup
    }

    if (direction === 'row') {
      const dir = dndStore.startY.get() > y ? 'up' : 'down'
      const dragOverRow = getDragOverRow(table, y)

      if (dragOverRow) {
        const [row, index] = dragOverRow
        dndStore.droppingIndex.set(index)
        void computePosition(row, host, {
          placement: dir === 'up' ? 'top' : 'bottom',
          middleware: [offset(dir === 'up' ? -1 * handleWidth : 0)],
        }).then(({ y }) => {
          if (cancelled) return
          assignStyles(host, { top: `${y}px` })
        })
      }

      return cleanup
    }
  })
}

const TableHandleDropIndicatorElementBase: HostElementConstructor<TableHandleDropIndicatorProps> = defineCustomElement(
  setupTableHandleDropIndicator,
  TableHandleDropIndicatorPropsDeclaration,
)

/**
 * `<prosekit-table-handle-drop-indicator>` custom element.
 *
 * Properties: {@link TableHandleDropIndicatorProps}
 */
export class TableHandleDropIndicatorElement extends TableHandleDropIndicatorElementBase {}

/**
 * @internal
 */
export function registerTableHandleDropIndicatorElement(): void {
  registerCustomElement('prosekit-table-handle-drop-indicator', TableHandleDropIndicatorElement)
}

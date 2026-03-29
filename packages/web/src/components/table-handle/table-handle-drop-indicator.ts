import {
  computed,
  defineCustomElement,
  defineProps,
  registerCustomElement,
  useEffect,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type Store,
} from '@aria-ui-v2/core'
import { computePosition, offset } from '@floating-ui/dom'
import { once } from '@ocavue/utils'
import type { Editor } from '@prosekit/core'
import type { defineTableCommands } from '@prosekit/extensions/table'

import { assignStyles } from '../../utils/assign-styles.ts'
import { getSafeEditorView } from '../../utils/get-safe-editor-view.ts'

import { getDragOverColumn, getDragOverRow } from './calc-drag-over.ts'
import { getDndRelatedDOMs, useInitDndPosition, type OnInitParams } from './dnd-v2.ts'
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
  props: Store<TableHandleDropIndicatorProps>,
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

  const getDragging = computed(() => getStore()?.dnd.get().dragging ?? false)
  const getClientX = computed(() => getStore()?.dnd.get().x ?? -1)
  const getClientY = computed(() => getStore()?.dnd.get().y ?? -1)
  const getStartX = computed(() => getStore()?.dnd.get().startX ?? -1)
  const getStartY = computed(() => getStore()?.dnd.get().startY ?? -1)

  useEffect(host, () => {
    const view = getSafeEditorView(getEditor())
    if (!view) return

    if (!getDragging()) return

    const store = getStore()
    if (!store) return
    const { draggingIndex, direction } = store.dnd.get()
    const x = getClientX()
    const y = getClientY()

    const relatedDOMs = getDndRelatedDOMs(view, store.getHoveringCell()?.cellPos, draggingIndex, direction)
    if (!relatedDOMs) return
    const { table } = relatedDOMs

    let cancelled = false
    const cleanup = () => {
      cancelled = true
    }

    if (direction === 'col') {
      const dir = getStartX() > x ? 'left' : 'right'
      const dragOverColumn = getDragOverColumn(table, x)

      if (dragOverColumn) {
        const [col, index] = dragOverColumn
        store.dnd.set({ ...store.dnd.get(), droppingIndex: index })
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
      const dir = getStartY() > y ? 'up' : 'down'
      const dragOverRow = getDragOverRow(table, y)

      if (dragOverRow) {
        const [row, index] = dragOverRow
        store.dnd.set({ ...store.dnd.get(), droppingIndex: index })
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
 * @public
 */
export class TableHandleDropIndicatorElement extends TableHandleDropIndicatorElementBase {}

/**
 * @internal
 */
export const registerTableHandleDropIndicatorElement: VoidFunction = once(() => {
  registerCustomElement('prosekit-table-handle-drop-indicator', TableHandleDropIndicatorElement)
})

import {
  defineCustomElement,
  defineProps,
  onMount,
  registerCustomElement,
  useEffect,
  useEventListener,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type Store,
} from '@aria-ui-v2/core'
import { MenuStoreContext } from '@aria-ui-v2/elements/menu'
import { once } from '@ocavue/utils'
import type { Editor } from '@prosekit/core'
import { selectTableRow, type defineTableCommands } from '@prosekit/extensions/table'

import { tableHandleStoreContext } from './store.ts'
import { useEmptyImage } from './use-empty-image.ts'

type TableCommandsExtension = ReturnType<typeof defineTableCommands>

export interface TableHandleRowTriggerProps {
  /**
   * @default null
   * @hidden
   */
  editor: Editor<TableCommandsExtension> | null
}

/** @internal */
export const TableHandleRowTriggerPropsDeclaration: PropsDeclaration<TableHandleRowTriggerProps> = defineProps<TableHandleRowTriggerProps>({
  editor: { default: null, attribute: false, type: 'json' },
})

/**
 * @internal
 */
export function setupTableHandleRowTrigger(
  host: HostElement,
  props: Store<TableHandleRowTriggerProps>,
): void {
  const getEditor = props.editor.get
  const getStore = tableHandleStoreContext.consume(host)
  const getMenuStore = MenuStoreContext.consume(host)

  // Set anchor for menu positioning
  useEffect(host, () => {
    getMenuStore()?.overlayStore.setAnchorElement(host)
  })

  // Toggle menu on click
  useEventListener(host, 'click', () => {
    getMenuStore()?.overlayStore.requestOpenToggle()
  })

  // Select row on pointerdown
  useEventListener(host, 'pointerdown', () => {
    const editor = getEditor()
    const cellPos = getStore()?.getHoveringCell()?.cellPos
    if (!editor || !cellPos) return
    editor.exec(selectTableRow({ head: cellPos }))
  })

  // Drag behavior
  onMount(host, () => {
    host.draggable = true
  })

  const getEmptyImage = useEmptyImage(host)

  useEventListener(host, 'dragstart', (event: DragEvent) => {
    const dataTransfer = event.dataTransfer
    if (dataTransfer) {
      dataTransfer.effectAllowed = 'move'
      const emptyImage = getEmptyImage()
      if (emptyImage) {
        dataTransfer.setDragImage(emptyImage, 0, 0)
      }
    }
    const store = getStore()
    if (!store) return
    const prev = store.dnd.get()
    const index = store.getHoveringCell()?.rowIndex

    if (index == null || index < 0) {
      console.warn('[prosekit] Invalid row index for drag operation:', index)
      event.preventDefault()
      return
    }

    store.dnd.set({
      ...prev,
      direction: 'row',
      dragging: true,
      draggingIndex: index,
      startX: event.clientX,
      startY: event.clientY,
    })
  })
}

const TableHandleRowTriggerElementBase: HostElementConstructor<TableHandleRowTriggerProps> = defineCustomElement(
  setupTableHandleRowTrigger,
  TableHandleRowTriggerPropsDeclaration,
)

/**
 * @public
 */
export class TableHandleRowTriggerElement extends TableHandleRowTriggerElementBase {}

/**
 * @internal
 */
export const registerTableHandleRowTriggerElement: VoidFunction = once(() => {
  registerCustomElement('prosekit-table-handle-row-trigger', TableHandleRowTriggerElement)
})

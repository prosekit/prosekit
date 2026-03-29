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
import { selectTableColumn, type defineTableCommands } from '@prosekit/extensions/table'

import { tableHandleStoreContext } from './store.ts'
import { useEmptyImage } from './use-empty-image.ts'

type TableCommandsExtension = ReturnType<typeof defineTableCommands>

export interface TableHandleColumnTriggerProps {
  /**
   * @default null
   * @hidden
   */
  editor: Editor<TableCommandsExtension> | null
}

/** @internal */
export const TableHandleColumnTriggerPropsDeclaration: PropsDeclaration<TableHandleColumnTriggerProps> = defineProps<
  TableHandleColumnTriggerProps
>({
  editor: { default: null, attribute: false, type: 'json' },
})

/**
 * @internal
 */
export function setupTableHandleColumnTrigger(
  host: HostElement,
  props: Store<TableHandleColumnTriggerProps>,
): void {
  const getEditor = props.editor.get
  const getStore = tableHandleStoreContext.consume(host)
  const getMenuStore = MenuStoreContext.consume(host)

  // Set anchor for menu positioning
  useEffect(host, () => {
    const store = getMenuStore()
    if (store) store.anchorElement.set(host)
  })

  // Toggle menu on click
  useEventListener(host, 'click', () => {
    const store = getMenuStore()
    if (!store) return
    store.emitOpenChange(!store.getOpen())
  })

  // Select column on pointerdown
  useEventListener(host, 'pointerdown', () => {
    const editor = getEditor()
    const cellPos = getStore()?.getHoveringCell()?.cellPos
    if (!editor || !cellPos) return
    editor.exec(selectTableColumn({ head: cellPos }))
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
      dataTransfer.setData('application/x-prosekit-table-handle-drag', '')
    }
    const store = getStore()
    if (!store) return
    const prev = store.dnd.get()
    const index = store.getHoveringCell()?.colIndex

    if (index == null || index < 0) {
      console.warn('[prosekit] Invalid column index for drag operation:', index)
      event.preventDefault()
      return
    }

    store.dnd.set({
      ...prev,
      direction: 'col',
      dragging: true,
      draggingIndex: index,
      startX: event.clientX,
      startY: event.clientY,
    })
  })
}

const TableHandleColumnTriggerElementBase: HostElementConstructor<TableHandleColumnTriggerProps> = defineCustomElement(
  setupTableHandleColumnTrigger,
  TableHandleColumnTriggerPropsDeclaration,
)

/**
 * @public
 */
export class TableHandleColumnTriggerElement extends TableHandleColumnTriggerElementBase {}

/**
 * @internal
 */
export const registerTableHandleColumnTriggerElement: VoidFunction = once(() => {
  registerCustomElement('prosekit-table-handle-column-trigger', TableHandleColumnTriggerElement)
})

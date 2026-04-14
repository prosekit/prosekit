import {
  createSignal,
  defineCustomElement,
  defineProps,
  onMount,
  registerCustomElement,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type State,
} from '@aria-ui/core'
import { setupMenuTrigger, type MenuTriggerProps } from '@aria-ui/elements/menu'
import { useEventListener } from '@aria-ui/utils'
import type { Editor } from '@prosekit/core'
import { selectTableRow, type defineTableCommands } from '@prosekit/extensions/table'

import { tableHandleStoreContext } from './store.ts'
import { useEmptyImage } from './use-empty-image.ts'

type TableCommandsExtension = ReturnType<typeof defineTableCommands>

export interface TableHandleRowMenuTriggerProps {
  /**
   * @default null
   * @hidden
   */
  editor: Editor<TableCommandsExtension> | null
}

/** @internal */
export const TableHandleRowMenuTriggerPropsDeclaration: PropsDeclaration<TableHandleRowMenuTriggerProps> = defineProps<
  TableHandleRowMenuTriggerProps
>({
  editor: { default: null, attribute: false, type: 'json' },
})

/** @internal */
export function setupTableHandleRowMenuTrigger(
  host: HostElement,
  props: State<TableHandleRowMenuTriggerProps>,
): void {
  const getEditor = props.editor.get
  const getStore = tableHandleStoreContext.consume(host)

  const triggerProps: State<MenuTriggerProps> = {
    disabled: createSignal(false),
  }
  setupMenuTrigger(host, triggerProps)

  useEventListener(host, 'pointerdown', () => {
    const editor = getEditor()
    const cellPos = getStore()?.getReferenceCell()?.cellPos
    if (!editor || !cellPos) return
    editor.exec(selectTableRow({ head: cellPos }))
  })

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
    const index = store.getReferenceCell()?.rowIndex

    if (index == null || index < 0) {
      console.warn('[prosekit] Invalid row index for drag operation:', index)
      event.preventDefault()
      return
    }

    const dndStore = store.dndStore

    dndStore.direction.set('row')
    dndStore.dragging.set(true)
    dndStore.draggingIndex.set(index)
    dndStore.startX.set(event.clientX)
    dndStore.startY.set(event.clientY)
  })
}

const TableHandleRowMenuTriggerElementBase: HostElementConstructor<TableHandleRowMenuTriggerProps> = defineCustomElement(
  setupTableHandleRowMenuTrigger,
  TableHandleRowMenuTriggerPropsDeclaration,
)

/**
 * `<prosekit-table-handle-row-menu-trigger>` custom element.
 *
 * Properties: {@link TableHandleRowMenuTriggerProps}
 */
export class TableHandleRowMenuTriggerElement extends TableHandleRowMenuTriggerElementBase {}

/**
 * @internal
 */
export function registerTableHandleRowMenuTriggerElement(): void {
  registerCustomElement('prosekit-table-handle-row-menu-trigger', TableHandleRowMenuTriggerElement)
}

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
import { selectTableColumn, type defineTableCommands } from '@prosekit/extensions/table'

import { tableHandleStoreContext } from './store.ts'
import { useEmptyImage } from './use-empty-image.ts'

type TableCommandsExtension = ReturnType<typeof defineTableCommands>

export interface TableHandleColumnMenuTriggerProps {
  /**
   * @default null
   * @hidden
   */
  editor: Editor<TableCommandsExtension> | null
}

/** @internal */
export const TableHandleColumnMenuTriggerPropsDeclaration: PropsDeclaration<TableHandleColumnMenuTriggerProps> = defineProps<
  TableHandleColumnMenuTriggerProps
>({
  editor: { default: null, attribute: false, type: 'json' },
})

/** @internal */
export function setupTableHandleColumnMenuTrigger(
  host: HostElement,
  props: State<TableHandleColumnMenuTriggerProps>,
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
    editor.exec(selectTableColumn({ head: cellPos }))
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
      dataTransfer.setData('application/x-prosekit-table-handle-drag', '')
    }
    const store = getStore()
    if (!store) return
    const index = store.getReferenceCell()?.colIndex

    if (index == null || index < 0) {
      console.warn('[prosekit] Invalid column index for drag operation:', index)
      event.preventDefault()
      return
    }

    const dndStore = store.dndStore
    dndStore.direction.set('col')
    dndStore.dragging.set(true)
    dndStore.draggingIndex.set(index)
    dndStore.startX.set(event.clientX)
    dndStore.startY.set(event.clientY)
  })
}

const TableHandleColumnMenuTriggerElementBase: HostElementConstructor<TableHandleColumnMenuTriggerProps> = defineCustomElement(
  setupTableHandleColumnMenuTrigger,
  TableHandleColumnMenuTriggerPropsDeclaration,
)

/**
 * `<prosekit-table-handle-column-menu-trigger>` custom element.
 *
 * Properties: {@link TableHandleColumnMenuTriggerProps}
 */
export class TableHandleColumnMenuTriggerElement extends TableHandleColumnMenuTriggerElementBase {}

/**
 * @internal
 */
export function registerTableHandleColumnMenuTriggerElement(): void {
  registerCustomElement('prosekit-table-handle-column-menu-trigger', TableHandleColumnMenuTriggerElement)
}

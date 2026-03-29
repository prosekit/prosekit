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
import { closeMenuTree, MenuStoreContext } from '@aria-ui-v2/elements/menu'
import { Collection, useAriaDisabled, useElementId } from '@aria-ui-v2/utils'
import { once } from '@ocavue/utils'

/**
 * @public
 */
export class TableHandlePopoverItemSelectEvent extends Event {
  constructor() {
    super('itemSelect', { bubbles: true, cancelable: true })
  }
}

/**
 * @public
 */
export interface TableHandlePopoverItemEvents {
  itemSelect: TableHandlePopoverItemSelectEvent
}

export interface TableHandlePopoverItemProps {
  /**
   * @default ""
   */
  value: string

  /**
   * @default false
   */
  disabled: boolean
}

/** @internal */
export const TableHandlePopoverItemPropsDeclaration: PropsDeclaration<TableHandlePopoverItemProps> = defineProps<
  TableHandlePopoverItemProps
>({
  value: { default: '', attribute: 'value', type: 'string' },
  disabled: { default: false, attribute: 'disabled', type: 'boolean' },
})

/**
 * @internal
 */
export function setupTableHandlePopoverItem(
  host: HostElement,
  props: Store<TableHandlePopoverItemProps>,
): void {
  onMount(host, () => {
    host.role = 'menuitem'
  })

  useElementId(host)

  const getStore = MenuStoreContext.consume(host)

  useEffect(host, () => {
    host.dataset.value = props.value.get()
  })

  useAriaDisabled(host, () => props.disabled.get())

  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    const value = props.value.get()
    const isActive = store.activeValue.get() === value
    if (isActive) {
      host.setAttribute('data-active', '')
    } else {
      host.removeAttribute('data-active')
    }
  })

  const rebuildCollection = () => {
    const store = getStore()
    if (!store) return
    const popup = host.closest('prosekit-table-handle-popover-popup')
    if (!popup) return
    const allItems = popup.querySelectorAll<HTMLElement>('prosekit-table-handle-popover-item')
    const levelItems = [...allItems].filter(
      (el) => el.closest('prosekit-table-handle-popover-popup') === popup,
    )
    store.collection.set(new Collection(levelItems))
  }

  onMount(host, () => {
    rebuildCollection()
    return () => rebuildCollection()
  })

  useEffect(host, () => {
    props.value.get()
    props.disabled.get()
    rebuildCollection()
  })

  useEventListener(host, 'mouseenter', () => {
    if (props.disabled.get()) return
    const store = getStore()
    if (!store) return
    store.activeValue.set(props.value.get())
  })

  useEventListener(host, 'click', () => {
    if (props.disabled.get()) return
    const store = getStore()
    if (!store) return

    store.activeValue.set(props.value.get())

    const selectEvent = new TableHandlePopoverItemSelectEvent()
    host.dispatchEvent(selectEvent)

    if (!selectEvent.defaultPrevented) {
      closeMenuTree(store)
    }
  })
}

const TableHandlePopoverItemElementBase: HostElementConstructor<TableHandlePopoverItemProps> = defineCustomElement(
  setupTableHandlePopoverItem,
  TableHandlePopoverItemPropsDeclaration,
)

/**
 * @public
 */
export class TableHandlePopoverItemElement extends TableHandlePopoverItemElementBase {}

/**
 * @internal
 */
export const registerTableHandlePopoverItemElement: VoidFunction = once(() => {
  registerCustomElement('prosekit-table-handle-popover-item', TableHandlePopoverItemElement)
})

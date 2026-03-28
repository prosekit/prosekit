import type { HostElement } from '@aria-ui-v2/core'
import { defineCustomElement, defineProps, onMount, registerCustomElement, useEffect, useEventListener, type Store } from '@aria-ui-v2/core'
import { Collection, useAriaDisabled, useElementId } from '@aria-ui-v2/utils'

import { closeMenuTree, MenuStoreContext } from './menu-store.ts'

/**
 * @public
 */
export class MenuItemSelectEvent extends Event {
  constructor() {
    super('select', { bubbles: true, cancelable: true })
  }
}

/**
 * @public
 */
export interface MenuItemProps {
  /**
   * The unique value for this menu item.
   *
   * @default ""
   */
  value: string

  /**
   * Whether this menu item is disabled.
   *
   * @default false
   */
  disabled: boolean
}

/**
 * @internal
 */
export const MenuItemPropsDeclaration = /* @__PURE__ */ defineProps<MenuItemProps>({
  value: { default: '', attribute: 'value', type: 'string' },
  disabled: { default: false, attribute: 'disabled', type: 'boolean' },
})

/**
 * @public
 */
export interface MenuItemEvents {
  /**
   * Fired when the item is selected.
   */
  select: MenuItemSelectEvent
}

/**
 * @internal
 */
export function setupMenuItem(
  host: HostElement,
  props: Store<MenuItemProps>,
) {
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
    const popup = host.closest('aria-ui-menu-popup')
    if (!popup) return
    const allItems = popup.querySelectorAll<HTMLElement>(
      'aria-ui-menu-item, aria-ui-menu-submenu-trigger',
    )
    const levelItems = [...allItems].filter(
      (el) => el.closest('aria-ui-menu-popup') === popup,
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

    const selectEvent = new MenuItemSelectEvent()
    host.dispatchEvent(selectEvent)

    if (!selectEvent.defaultPrevented) {
      closeMenuTree(store)
    }
  })
}

/**
 * @public
 */
export class MenuItemElement extends defineCustomElement(
  setupMenuItem,
  MenuItemPropsDeclaration,
) {}

let isRegistered = false

/**
 * @internal
 */
export function registerMenuItemElement(): void {
  if (isRegistered) return
  isRegistered = true
  registerCustomElement('aria-ui-menu-item', MenuItemElement)
}

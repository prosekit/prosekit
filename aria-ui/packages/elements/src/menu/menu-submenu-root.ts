import type { HostElement } from '@aria-ui-v2/core'
import { createSignal, defineCustomElement, defineProps, registerCustomElement, useEffect, type Store } from '@aria-ui-v2/core'

import { OpenChangeEvent } from '../overlay/open-change-event.ts'

import { MenuStore, MenuStoreContext } from './menu-store.ts'

/**
 * @public
 */
export interface MenuSubmenuRootProps {}

/**
 * @internal
 */
export const MenuSubmenuRootPropsDeclaration = /* @__PURE__ */ defineProps<MenuSubmenuRootProps>({})

/**
 * @public
 */
export interface MenuSubmenuRootEvents {
  /**
   * Emitted when the submenu is opened or closed.
   */
  openChange: OpenChangeEvent
}

/**
 * @internal
 */
export function setupMenuSubmenuRoot(
  host: HostElement,
  _props: Store<MenuSubmenuRootProps>,
) {
  const getParentStore = MenuStoreContext.consume(host)

  const open = createSignal(false)
  const getOpen = () => open.get()

  const emitOpenChange = (newOpen: boolean) => {
    const event = new OpenChangeEvent(newOpen)
    host.dispatchEvent(event)
    if (event.defaultPrevented) return
    open.set(newOpen)
  }

  const childStore = new MenuStore(getOpen, emitOpenChange)
  MenuStoreContext.provide(host, childStore)

  useEffect(host, () => {
    const parentStore = getParentStore()
    if (parentStore) {
      childStore.parentStore = parentStore
    }
  })

  useEffect(host, () => {
    const parentStore = getParentStore()
    if (!parentStore) return
    if (!parentStore.getOpen()) {
      open.set(false)
    }
  })

  useEffect(host, () => {
    if (open.get()) return

    const parentStore = getParentStore()
    if (!parentStore) return

    const parentPopup = host.closest('aria-ui-menu-popup')
    if (parentPopup instanceof HTMLElement) {
      requestAnimationFrame(() => {
        parentPopup.focus()
      })
    }
  })
}

/**
 * @public
 */
export class MenuSubmenuRootElement extends defineCustomElement(
  setupMenuSubmenuRoot,
  MenuSubmenuRootPropsDeclaration,
) {}

let isRegistered = false

/**
 * @internal
 */
export function registerMenuSubmenuRootElement(): void {
  if (isRegistered) return
  isRegistered = true
  registerCustomElement('aria-ui-menu-submenu-root', MenuSubmenuRootElement)
}

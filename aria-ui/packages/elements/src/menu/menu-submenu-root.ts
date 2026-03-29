import type { HostElement } from '@aria-ui-v2/core'
import {  defineCustomElement, defineProps, registerCustomElement, useEffect, type Store } from '@aria-ui-v2/core'

import type { OpenChangeEvent } from '../overlay/open-change-event.ts'
import type { OverlayRootProps} from '../overlay/overlay-root.ts';
import   { OverlayRootPropsDeclaration } from '../overlay/overlay-root.ts'
import { createOverlayStore } from '../overlay/overlay-store.ts';

import {  createMenuStore, MenuStoreContext } from './menu-store.ts'

/**
 * @public
 */
export interface MenuSubmenuRootProps   extends OverlayRootProps {}

/**
 * @internal
 */
export const MenuSubmenuRootPropsDeclaration = /* @__PURE__ */ defineProps<MenuSubmenuRootProps>({
  ...OverlayRootPropsDeclaration
})

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
  props: Store<MenuSubmenuRootProps>,
) {
  const getParentStore = MenuStoreContext.consume(host)
  const overlayStore =createOverlayStore(
    props.open.get,
    props.open.set,
    props.defaultOpen.get,
    props.disabled.get,
   (event) => {
    host.dispatchEvent(event)
   },
  )
  const menuStore = createMenuStore(overlayStore, getParentStore)
    MenuStoreContext.provide(host, menuStore)

  useEffect(host, () => {
    const parentMenuStore = getParentStore()
    const parentOverlayStore = parentMenuStore?.overlayStore
    if (!parentOverlayStore) return
    if (parentOverlayStore.getIsOpen() === false  ) {
      overlayStore.requestOpenChange(false)
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

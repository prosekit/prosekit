import type { HostElement } from '@aria-ui-v2/core'
import { computed, defineCustomElement, defineProps, registerCustomElement, type Store } from '@aria-ui-v2/core'
import { useAriaDisabled } from '@aria-ui-v2/utils'

import { OpenChangeEvent } from '../overlay/open-change-event.ts'
import { OverlayRootPropsDeclaration, type OverlayRootProps } from '../overlay/overlay-root.ts'

import { MenuStore, MenuStoreContext } from './menu-store.ts'

export { OpenChangeEvent }

/**
 * @public
 */
export interface MenuRootProps extends OverlayRootProps {}

/**
 * @internal
 */
export const MenuRootPropsDeclaration = defineProps<MenuRootProps>({
  ...OverlayRootPropsDeclaration,
})

/**
 * @public
 */
export interface MenuRootEvents {
  /**
   * Emitted when the menu is opened or closed.
   */
  openChange: OpenChangeEvent
}

/**
 * @internal
 */
export function setupMenuRoot(
  host: HostElement,
  props: Store<MenuRootProps>,
) {
  const getOpen = computed(() => {
    const open = props.open.get()
    const defaultOpen = props.defaultOpen.get()
    return open ?? defaultOpen
  })

  const getDisabled = computed(() => props.disabled.get())

  const emitOpenChange = (open: boolean) => {
    if (getDisabled()) return
    const event = new OpenChangeEvent(open)
    host.dispatchEvent(event)
    if (event.defaultPrevented) return
    props.open.set(open)
  }

  const store = new MenuStore(getOpen, emitOpenChange)
  useAriaDisabled(host, getDisabled)
  MenuStoreContext.provide(host, store)
}

/**
 * @public
 */
export class MenuRootElement extends defineCustomElement(
  setupMenuRoot,
  MenuRootPropsDeclaration,
) {}

let isRegistered = false

/**
 * @internal
 */
export function registerMenuRootElement(): void {
  if (isRegistered) return
  isRegistered = true
  registerCustomElement('aria-ui-menu-root', MenuRootElement)
}

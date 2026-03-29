import type { HostElement } from '@aria-ui-v2/core'
import { defineCustomElement, defineProps, registerCustomElement, type Store } from '@aria-ui-v2/core'
import type { Placement } from '@floating-ui/dom'

import { OverlayPositionerPropsDeclaration, setupOverlayPositioner, type OverlayPositionerProps } from '../overlay/overlay-positioner.ts'

import { MenuStoreContext } from './menu-store.ts'

/**
 * @public
 */
export interface MenuPositionerProps extends Omit<OverlayPositionerProps, 'placement'> {
  /**
   * The initial placement of the floating element
   *
   * @default "bottom-start"
   */
  placement: Placement
}

/**
 * @internal
 */
export const MenuPositionerPropsDeclaration = defineProps<MenuPositionerProps>({
  ...OverlayPositionerPropsDeclaration,
  placement: { default: 'bottom-start', attribute: 'placement', type: 'string' },
})

/**
 * @internal
 */
export function setupMenuPositioner(
  host: HostElement,
  props: Store<MenuPositionerProps>,
) {
const   getMenuStore = MenuStoreContext.consume(host)
const   getOverlayStore = () => getMenuStore()?.overlayStore
  setupOverlayPositioner(host, props, getOverlayStore)
}

/**
 * @public
 */
export class MenuPositionerElement extends defineCustomElement(
  setupMenuPositioner,
  MenuPositionerPropsDeclaration,
) {}

let isRegistered = false

/**
 * @internal
 */
export function registerMenuPositionerElement(): void {
  if (isRegistered) return
  isRegistered = true
  registerCustomElement('aria-ui-menu-positioner', MenuPositionerElement)
}

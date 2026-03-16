import type { HostElement } from '@aria-ui-v2/core'
import { defineCustomElement, registerCustomElement, type Store } from '@aria-ui-v2/core'

import { OverlayPositionerPropsDeclaration, setupOverlayPositioner, type OverlayPositionerProps } from '../overlay/overlay-positioner.ts'

import { PopoverStoreContext } from './popover-store.ts'

/**
 * @public
 */
export interface PopoverPositionerProps extends OverlayPositionerProps {}

/**
 * @internal
 */
export const PopoverPositionerPropsDeclaration = OverlayPositionerPropsDeclaration

/**
 * @internal
 */
export function setupPopoverPositioner(
  host: HostElement,
  props: Store<PopoverPositionerProps>,
) {
  setupOverlayPositioner(host, props, PopoverStoreContext)
}

/**
 * @public
 */
export class PopoverPositionerElement extends defineCustomElement(
  setupPopoverPositioner,
  PopoverPositionerPropsDeclaration,
) {}

/**
 * @internal
 */
export function registerPopoverPositionerElement(): void {
  registerCustomElement('aria-ui-popover-positioner', PopoverPositionerElement)
}

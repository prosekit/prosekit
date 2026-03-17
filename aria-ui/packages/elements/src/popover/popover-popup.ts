import type { HostElement, Store } from '@aria-ui-v2/core'
import { defineCustomElement, registerCustomElement } from '@aria-ui-v2/core'

import { OverlayPopupPropsDeclaration, setupOverlayPopup, type OverlayPopupProps } from '../overlay/overlay-popup.ts'

import { PopoverStoreContext } from './popover-store.ts'

/**
 * @public
 */
export interface PopoverPopupProps extends OverlayPopupProps {}

/**
 * @internal
 */
export const PopoverPopupPropsDeclaration = OverlayPopupPropsDeclaration

/**
 * @internal
 */
export function setupPopoverPopup(
  host: HostElement,
  props: Store<PopoverPopupProps>,
) {
  setupOverlayPopup(host, props, PopoverStoreContext, 'dialog')
}

/**
 * @public
 */
export class PopoverPopupElement extends defineCustomElement(
  setupPopoverPopup,
  PopoverPopupPropsDeclaration,
) {}

let isRegistered = false

/**
 * @internal
 */
export function registerPopoverPopupElement(): void {
  if (isRegistered) return
  isRegistered = true
  registerCustomElement('aria-ui-popover-popup', PopoverPopupElement)
}

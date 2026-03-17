import type { HostElement, Store } from '@aria-ui-v2/core'
import { defineCustomElement, registerCustomElement } from '@aria-ui-v2/core'

import { OverlayPopupPropsDeclaration, setupOverlayPopup, type OverlayPopupProps } from '../overlay/overlay-popup.ts'

import { TooltipStoreContext } from './tooltip-store.ts'

/**
 * @public
 */
export interface TooltipPopupProps extends OverlayPopupProps {}

/**
 * @internal
 */
export const TooltipPopupPropsDeclaration = OverlayPopupPropsDeclaration

/**
 * @internal
 */
export function setupTooltipPopup(
  host: HostElement,
  props: Store<TooltipPopupProps>,
) {
  setupOverlayPopup(host, props, TooltipStoreContext, 'tooltip')
}

/**
 * @public
 */
export class TooltipPopupElement extends defineCustomElement(
  setupTooltipPopup,
  TooltipPopupPropsDeclaration,
) {}

let isRegistered = false

/**
 * @internal
 */
export function registerTooltipPopupElement(): void {
  if (isRegistered) return
  isRegistered = true
  registerCustomElement('aria-ui-tooltip-popup', TooltipPopupElement)
}

import type { HostElement } from '@aria-ui-v2/core'
import { defineCustomElement, registerCustomElement, type Store } from '@aria-ui-v2/core'

import { OpenChangeEvent } from '../overlay/open-change-event.ts'
import { OverlayRootPropsDeclaration, setupOverlayRoot, type OverlayRootProps } from '../overlay/overlay-root.ts'
import { notifyTooltipClosed } from './tooltip-group.ts'
import { TooltipStoreContext } from './tooltip-store.ts'

export { OpenChangeEvent }

/**
 * @public
 */
export interface TooltipRootProps extends OverlayRootProps {}

/**
 * @internal
 */
export const TooltipRootPropsDeclaration = OverlayRootPropsDeclaration

/**
 * @public
 */
export interface TooltipRootEvents {
  /**
   * Emitted when the tooltip is opened or closed.
   */
  openChange: OpenChangeEvent
}

/**
 * @internal
 */
export function setupTooltipRoot(
  host: HostElement,
  props: Store<TooltipRootProps>,
) {
  setupOverlayRoot(host, props, TooltipStoreContext, {
    onBeforeOpenChange: (open) => {
      if (!open) notifyTooltipClosed()
    },
  })
}

/**
 * @public
 */
export class TooltipRootElement extends defineCustomElement(
  setupTooltipRoot,
  TooltipRootPropsDeclaration,
) {}

/**
 * @internal
 */
export function registerTooltipRootElement(): void {
  registerCustomElement('aria-ui-tooltip-root', TooltipRootElement)
}

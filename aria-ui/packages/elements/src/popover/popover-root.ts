import type { HostElement } from '@aria-ui-v2/core'
import { defineCustomElement, defineProps, registerCustomElement, type Store } from '@aria-ui-v2/core'

import { OpenChangeEvent } from '../overlay/open-change-event.ts'
import { OverlayRootPropsDeclaration, setupOverlayRoot, type OverlayRootProps } from '../overlay/overlay-root.ts'

import { PopoverStoreContext } from './popover-store.ts'

export { OpenChangeEvent }

/**
 * @public
 */
export interface PopoverRootProps extends OverlayRootProps {
  /**
   * Whether the popover should be modal.
   * When true, the popover will trap focus and prevent interaction with the rest of the page.
   *
   * @default false
   */
  modal: boolean
}

/**
 * @internal
 */
export const PopoverRootPropsDeclaration = defineProps<PopoverRootProps>({
  ...OverlayRootPropsDeclaration,
  modal: {
    default: false,
    attribute: 'modal',
    type: 'boolean',
  },
})

/**
 * @public
 */
export interface PopoverRootEvents {
  /**
   * Emitted when the popover is opened or closed.
   */
  openChange: OpenChangeEvent
}

/**
 * @internal
 */
export function setupPopoverRoot(
  host: HostElement,
  props: Store<PopoverRootProps>,
) {
  setupOverlayRoot(host, props, PopoverStoreContext)
}

/**
 * @public
 */
export class PopoverRootElement extends defineCustomElement(
  setupPopoverRoot,
  PopoverRootPropsDeclaration,
) {}

let isRegistered = false

/**
 * @internal
 */
export function registerPopoverRootElement(): void {
  if (isRegistered) return
  isRegistered = true
  registerCustomElement('aria-ui-popover-root', PopoverRootElement)
}

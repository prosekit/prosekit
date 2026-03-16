import { PopoverPopupElement, registerPopoverPopupElement } from './popover/popover-popup.ts'
import { PopoverPositionerElement, registerPopoverPositionerElement } from './popover/popover-positioner.ts'
import { PopoverRootElement, registerPopoverRootElement } from './popover/popover-root.ts'
import { PopoverTriggerElement, registerPopoverTriggerElement } from './popover/popover-trigger.ts'

export {
  PopoverPopupElement,
  PopoverPositionerElement,
  PopoverRootElement,
  PopoverTriggerElement,
  registerPopoverPopupElement,
  registerPopoverPositionerElement,
  registerPopoverRootElement,
  registerPopoverTriggerElement,
}

/**
 * Register all custom elements:
 *
 * - 'aria-ui-popover-popup'
 * - 'aria-ui-popover-positioner'
 * - 'aria-ui-popover-root'
 * - 'aria-ui-popover-trigger'
 */
export function registerElements(): void {
  // Skip registration on non-browser environments
  if (typeof window === 'undefined') {
    return
  }

  registerPopoverRootElement()
  registerPopoverTriggerElement()
  registerPopoverPopupElement()
  registerPopoverPositionerElement()
}

declare global {
  interface HTMLElementTagNameMap {
    'aria-ui-popover-root': PopoverRootElement
    'aria-ui-popover-trigger': PopoverTriggerElement
    'aria-ui-popover-popup': PopoverPopupElement
    'aria-ui-popover-positioner': PopoverPositionerElement
  }
}

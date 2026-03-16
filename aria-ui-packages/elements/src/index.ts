import {
  PopoverPopupElement,
  registerPopoverPopupElement,
} from './generated/elements/popover-popup.gen.ts'
import {
  PopoverPositionerElement,
  registerPopoverPositionerElement,
} from './generated/elements/popover-positioner.gen.ts'
import {
  PopoverRootElement,
  registerPopoverRootElement,
} from './generated/elements/popover-root.gen.ts'
import {
  PopoverTriggerElement,
  registerPopoverTriggerElement,
} from './generated/elements/popover-trigger.gen.ts'

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

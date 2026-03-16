import { PopoverPopupElement, registerPopoverPopupElement } from './popover/popover-popup.ts'
import { PopoverPositionerElement, registerPopoverPositionerElement } from './popover/popover-positioner.ts'
import { PopoverRootElement, registerPopoverRootElement } from './popover/popover-root.ts'
import { PopoverTriggerElement, registerPopoverTriggerElement } from './popover/popover-trigger.ts'
import { TooltipPopupElement, registerTooltipPopupElement } from './tooltip/tooltip-popup.ts'
import { TooltipPositionerElement, registerTooltipPositionerElement } from './tooltip/tooltip-positioner.ts'
import { TooltipRootElement, registerTooltipRootElement } from './tooltip/tooltip-root.ts'
import { TooltipTriggerElement, registerTooltipTriggerElement } from './tooltip/tooltip-trigger.ts'

export {
  PopoverPopupElement,
  PopoverPositionerElement,
  PopoverRootElement,
  PopoverTriggerElement,
  registerPopoverPopupElement,
  registerPopoverPositionerElement,
  registerPopoverRootElement,
  registerPopoverTriggerElement,
  TooltipPopupElement,
  TooltipPositionerElement,
  TooltipRootElement,
  TooltipTriggerElement,
  registerTooltipPopupElement,
  registerTooltipPositionerElement,
  registerTooltipRootElement,
  registerTooltipTriggerElement,
}

/**
 * Register all custom elements:
 *
 * - 'aria-ui-popover-popup'
 * - 'aria-ui-popover-positioner'
 * - 'aria-ui-popover-root'
 * - 'aria-ui-popover-trigger'
 * - 'aria-ui-tooltip-popup'
 * - 'aria-ui-tooltip-positioner'
 * - 'aria-ui-tooltip-root'
 * - 'aria-ui-tooltip-trigger'
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

  registerTooltipRootElement()
  registerTooltipTriggerElement()
  registerTooltipPopupElement()
  registerTooltipPositionerElement()
}

declare global {
  interface HTMLElementTagNameMap {
    'aria-ui-popover-root': PopoverRootElement
    'aria-ui-popover-trigger': PopoverTriggerElement
    'aria-ui-popover-popup': PopoverPopupElement
    'aria-ui-popover-positioner': PopoverPositionerElement
    'aria-ui-tooltip-root': TooltipRootElement
    'aria-ui-tooltip-trigger': TooltipTriggerElement
    'aria-ui-tooltip-popup': TooltipPopupElement
    'aria-ui-tooltip-positioner': TooltipPositionerElement
  }
}

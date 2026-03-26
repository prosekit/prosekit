import { ListboxEmptyElement, registerListboxEmptyElement } from './listbox/listbox-empty.ts'
import { ListboxItemElement, registerListboxItemElement } from './listbox/listbox-item.ts'
import { ListboxRootElement, registerListboxRootElement } from './listbox/listbox-root.ts'
import { PopoverPopupElement, registerPopoverPopupElement } from './popover/popover-popup.ts'
import { PopoverPositionerElement, registerPopoverPositionerElement } from './popover/popover-positioner.ts'
import { PopoverRootElement, registerPopoverRootElement } from './popover/popover-root.ts'
import { PopoverTriggerElement, registerPopoverTriggerElement } from './popover/popover-trigger.ts'
import { registerTooltipPopupElement, TooltipPopupElement } from './tooltip/tooltip-popup.ts'
import { registerTooltipPositionerElement, TooltipPositionerElement } from './tooltip/tooltip-positioner.ts'
import { registerTooltipRootElement, TooltipRootElement } from './tooltip/tooltip-root.ts'
import { registerTooltipTriggerElement, TooltipTriggerElement } from './tooltip/tooltip-trigger.ts'

export {
  ListboxEmptyElement,
  ListboxItemElement,
  ListboxRootElement,
  PopoverPopupElement,
  PopoverPositionerElement,
  PopoverRootElement,
  PopoverTriggerElement,
  registerListboxEmptyElement,
  registerListboxItemElement,
  registerListboxRootElement,
  registerPopoverPopupElement,
  registerPopoverPositionerElement,
  registerPopoverRootElement,
  registerPopoverTriggerElement,
  registerTooltipPopupElement,
  registerTooltipPositionerElement,
  registerTooltipRootElement,
  registerTooltipTriggerElement,
  TooltipPopupElement,
  TooltipPositionerElement,
  TooltipRootElement,
  TooltipTriggerElement,
}

/**
 * Register all custom elements:
 *
 * - 'aria-ui-listbox-root'
 * - 'aria-ui-listbox-item'
 * - 'aria-ui-listbox-empty'
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

  registerListboxRootElement()
  registerListboxItemElement()
  registerListboxEmptyElement()

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
    'aria-ui-listbox-root': ListboxRootElement
    'aria-ui-listbox-item': ListboxItemElement
    'aria-ui-listbox-empty': ListboxEmptyElement
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

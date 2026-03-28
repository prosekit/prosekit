import { ListboxEmptyElement, registerListboxEmptyElement } from './listbox/listbox-empty.ts'
import { ListboxItemElement, registerListboxItemElement } from './listbox/listbox-item.ts'
import { ListboxRootElement, registerListboxRootElement } from './listbox/listbox-root.ts'
import { MenuItemElement, registerMenuItemElement } from './menu/menu-item.ts'
import { MenuPopupElement, registerMenuPopupElement } from './menu/menu-popup.ts'
import { MenuPositionerElement, registerMenuPositionerElement } from './menu/menu-positioner.ts'
import { MenuRootElement, registerMenuRootElement } from './menu/menu-root.ts'
import { MenuSubmenuRootElement, registerMenuSubmenuRootElement } from './menu/menu-submenu-root.ts'
import { MenuSubmenuTriggerElement, registerMenuSubmenuTriggerElement } from './menu/menu-submenu-trigger.ts'
import { MenuTriggerElement, registerMenuTriggerElement } from './menu/menu-trigger.ts'
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
  MenuItemElement,
  MenuPopupElement,
  MenuPositionerElement,
  MenuRootElement,
  MenuSubmenuRootElement,
  MenuSubmenuTriggerElement,
  MenuTriggerElement,
  PopoverPopupElement,
  PopoverPositionerElement,
  PopoverRootElement,
  PopoverTriggerElement,
  registerListboxEmptyElement,
  registerListboxItemElement,
  registerListboxRootElement,
  registerMenuItemElement,
  registerMenuPopupElement,
  registerMenuPositionerElement,
  registerMenuRootElement,
  registerMenuSubmenuRootElement,
  registerMenuSubmenuTriggerElement,
  registerMenuTriggerElement,
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

  registerMenuRootElement()
  registerMenuTriggerElement()
  registerMenuPopupElement()
  registerMenuPositionerElement()
  registerMenuItemElement()
  registerMenuSubmenuRootElement()
  registerMenuSubmenuTriggerElement()

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
    'aria-ui-menu-root': MenuRootElement
    'aria-ui-menu-trigger': MenuTriggerElement
    'aria-ui-menu-popup': MenuPopupElement
    'aria-ui-menu-positioner': MenuPositionerElement
    'aria-ui-menu-item': MenuItemElement
    'aria-ui-menu-submenu-root': MenuSubmenuRootElement
    'aria-ui-menu-submenu-trigger': MenuSubmenuTriggerElement
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

/**

@module

## Anatomy

```html
<prosekit-menu-root>
  <prosekit-menu-trigger>...</prosekit-menu-trigger>
  <prosekit-menu-positioner>
    <prosekit-menu-popup>
       <prosekit-menu-item>...</prosekit-menu-item>
       <prosekit-menu-submenu-root>
         <prosekit-menu-submenu-trigger>...</prosekit-menu-submenu-trigger>
         <prosekit-menu-positioner>
           <prosekit-menu-popup>
             <prosekit-menu-item>...</prosekit-menu-item>
           </prosekit-menu-popup>
         </prosekit-menu-positioner>
       </prosekit-menu-submenu-root>
    </prosekit-menu-popup>
  </prosekit-menu-positioner>
</prosekit-menu-root>
```
*/

import { registerCustomElement } from '@aria-ui/core'
import {
  MenuItemElement,
  MenuPopupElement,
  MenuPositionerElement,
  MenuRootElement,
  MenuSubmenuRootElement,
  MenuSubmenuTriggerElement,
  MenuTriggerElement,
} from '@aria-ui/elements/menu'

export {
  MenuItemElement,
  MenuItemPropsDeclaration,
  MenuPopupElement,
  MenuPopupPropsDeclaration,
  MenuPositionerElement,
  MenuPositionerPropsDeclaration,
  MenuRootElement,
  MenuRootPropsDeclaration,
  MenuSubmenuRootElement,
  MenuSubmenuRootPropsDeclaration,
  MenuSubmenuTriggerElement,
  MenuSubmenuTriggerPropsDeclaration,
  MenuTriggerElement,
  MenuTriggerPropsDeclaration,
  OpenChangeEvent,
  SelectEvent,
  setupMenuItem,
  setupMenuPopup,
  setupMenuPositioner,
  setupMenuRoot,
  setupMenuSubmenuRoot,
  setupMenuSubmenuTrigger,
  setupMenuTrigger,
  type MenuItemEvents,
  type MenuItemProps,
  type MenuPopupProps,
  type MenuPositionerProps,
  type MenuRootEvents,
  type MenuRootProps,
  type MenuTriggerEvents,
  type MenuTriggerProps,
} from '@aria-ui/elements/menu'

export function registerMenuRootElement(): void {
  registerCustomElement('prosekit-menu-root', MenuRootElement)
}
export function registerMenuTriggerElement(): void {
  registerCustomElement('prosekit-menu-trigger', MenuTriggerElement)
}
export function registerMenuPositionerElement(): void {
  registerCustomElement('prosekit-menu-positioner', MenuPositionerElement)
}
export function registerMenuPopupElement(): void {
  registerCustomElement('prosekit-menu-popup', MenuPopupElement)
}
export function registerMenuItemElement(): void {
  registerCustomElement('prosekit-menu-item', MenuItemElement)
}
export function registerMenuSubmenuRootElement(): void {
  registerCustomElement('prosekit-menu-submenu-root', MenuSubmenuRootElement)
}
export function registerMenuSubmenuTriggerElement(): void {
  registerCustomElement('prosekit-menu-submenu-trigger', MenuSubmenuTriggerElement)
}

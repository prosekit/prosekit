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

import { registerCustomElement, type PropsDeclaration } from '@aria-ui/core'
import * as Base from '@aria-ui/elements/menu'

export class MenuItemElement extends Base.MenuItemElement {}
export class MenuPopupElement extends Base.MenuPopupElement {}
export class MenuPositionerElement extends Base.MenuPositionerElement {}
export class MenuRootElement extends Base.MenuRootElement {}
export class MenuSubmenuRootElement extends Base.MenuSubmenuRootElement {}
export class MenuSubmenuTriggerElement extends Base.MenuSubmenuTriggerElement {}
export class MenuTriggerElement extends Base.MenuTriggerElement {}

export interface MenuItemProps extends Base.MenuItemProps {}
export interface MenuPopupProps extends Base.MenuPopupProps {}
export interface MenuPositionerProps extends Base.MenuPositionerProps {}
export interface MenuRootProps extends Base.MenuRootProps {}
export interface MenuSubmenuRootProps extends Base.MenuSubmenuRootProps {}
export interface MenuSubmenuTriggerProps extends Base.MenuSubmenuTriggerProps {}
export interface MenuTriggerProps extends Base.MenuTriggerProps {}

export interface MenuItemEvents extends Base.MenuItemEvents {}
export interface MenuRootEvents extends Base.MenuRootEvents {}
export interface MenuSubmenuRootEvents extends Base.MenuSubmenuRootEvents {}
export interface MenuTriggerEvents extends Base.MenuTriggerEvents {}

/** @internal */
export const MenuItemPropsDeclaration: PropsDeclaration<MenuItemProps> = Base.MenuItemPropsDeclaration
/** @internal */
export const MenuPopupPropsDeclaration: PropsDeclaration<MenuPopupProps> = Base.MenuPopupPropsDeclaration
/** @internal */
export const MenuPositionerPropsDeclaration: PropsDeclaration<MenuPositionerProps> = Base.MenuPositionerPropsDeclaration
/** @internal */
export const MenuRootPropsDeclaration: PropsDeclaration<MenuRootProps> = Base.MenuRootPropsDeclaration
/** @internal */
export const MenuSubmenuRootPropsDeclaration: PropsDeclaration<MenuSubmenuRootProps> = Base.MenuSubmenuRootPropsDeclaration
/** @internal */
export const MenuSubmenuTriggerPropsDeclaration: PropsDeclaration<MenuSubmenuTriggerProps> = Base.MenuSubmenuTriggerPropsDeclaration
/** @internal */
export const MenuTriggerPropsDeclaration: PropsDeclaration<MenuTriggerProps> = Base.MenuTriggerPropsDeclaration

export {
  OpenChangeEvent,
  SelectEvent,
  setupMenuItem,
  setupMenuPopup,
  setupMenuPositioner,
  setupMenuRoot,
  setupMenuSubmenuRoot,
  setupMenuSubmenuTrigger,
  setupMenuTrigger,
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

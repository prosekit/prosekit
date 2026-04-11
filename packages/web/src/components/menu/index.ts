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
import type {
  MenuItemEvents as BaseMenuItemEvents,
  MenuItemProps as BaseMenuItemProps,
  MenuPopupProps as BaseMenuPopupProps,
  MenuPositionerProps as BaseMenuPositionerProps,
  MenuRootEvents as BaseMenuRootEvents,
  MenuRootProps as BaseMenuRootProps,
  MenuSubmenuRootEvents as BaseMenuSubmenuRootEvents,
  MenuSubmenuRootProps as BaseMenuSubmenuRootProps,
  MenuSubmenuTriggerProps as BaseMenuSubmenuTriggerProps,
  MenuTriggerEvents as BaseMenuTriggerEvents,
  MenuTriggerProps as BaseMenuTriggerProps,
} from '@aria-ui/elements/menu'
import {
  MenuItemElement as BaseMenuItemElement,
  MenuItemPropsDeclaration as BaseMenuItemPropsDeclaration,
  MenuPopupElement as BaseMenuPopupElement,
  MenuPopupPropsDeclaration as BaseMenuPopupPropsDeclaration,
  MenuPositionerElement as BaseMenuPositionerElement,
  MenuPositionerPropsDeclaration as BaseMenuPositionerPropsDeclaration,
  MenuRootElement as BaseMenuRootElement,
  MenuRootPropsDeclaration as BaseMenuRootPropsDeclaration,
  MenuSubmenuRootElement as BaseMenuSubmenuRootElement,
  MenuSubmenuRootPropsDeclaration as BaseMenuSubmenuRootPropsDeclaration,
  MenuSubmenuTriggerElement as BaseMenuSubmenuTriggerElement,
  MenuSubmenuTriggerPropsDeclaration as BaseMenuSubmenuTriggerPropsDeclaration,
  MenuTriggerElement as BaseMenuTriggerElement,
  MenuTriggerPropsDeclaration as BaseMenuTriggerPropsDeclaration,
} from '@aria-ui/elements/menu'

/**
 * `<prosekit-menu-item>` custom element.
 *
 * Properties: {@link MenuItemProps}
 *
 * Events: {@link MenuItemEvents}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-highlighted` | Present when the item is the currently highlighted option |
 */
export class MenuItemElement extends BaseMenuItemElement {}

/**
 * `<prosekit-menu-popup>` custom element.
 *
 * Properties: {@link MenuPopupProps}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-state` | `"open"` when the menu is visible, `"closed"` otherwise |
 */
export class MenuPopupElement extends BaseMenuPopupElement {}

/**
 * `<prosekit-menu-positioner>` custom element.
 *
 * Properties: {@link MenuPositionerProps}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-state` | `"open"` when the menu is visible, `"closed"` otherwise |
 *
 * CSS variables:
 *
 * | Variable | Description |
 * | --- | --- |
 * | `--transform-origin` | The coordinates that this element is anchored to. Useful for scale animations. |
 */
export class MenuPositionerElement extends BaseMenuPositionerElement {}

/**
 * `<prosekit-menu-root>` custom element.
 *
 * Properties: {@link MenuRootProps}
 *
 * Events: {@link MenuRootEvents}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-menu-root` | Always present on the element |
 */
export class MenuRootElement extends BaseMenuRootElement {}

/**
 * `<prosekit-menu-submenu-root>` custom element.
 *
 * Properties: {@link MenuSubmenuRootProps}
 *
 * Events: {@link MenuSubmenuRootEvents}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-menu-submenu-root` | Always present on the element |
 */
export class MenuSubmenuRootElement extends BaseMenuSubmenuRootElement {}

/**
 * `<prosekit-menu-submenu-trigger>` custom element.
 *
 * Properties: {@link MenuSubmenuTriggerProps}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-highlighted` | Present when the item is the currently highlighted option |
 */
export class MenuSubmenuTriggerElement extends BaseMenuSubmenuTriggerElement {}

/**
 * `<prosekit-menu-trigger>` custom element.
 *
 * Properties: {@link MenuTriggerProps}
 *
 * Events: {@link MenuTriggerEvents}
 */
export class MenuTriggerElement extends BaseMenuTriggerElement {}

export interface MenuItemProps extends BaseMenuItemProps {}
export interface MenuPopupProps extends BaseMenuPopupProps {}
export interface MenuPositionerProps extends BaseMenuPositionerProps {}
export interface MenuRootProps extends BaseMenuRootProps {}
export interface MenuSubmenuRootProps extends BaseMenuSubmenuRootProps {}
export interface MenuSubmenuTriggerProps extends BaseMenuSubmenuTriggerProps {}
export interface MenuTriggerProps extends BaseMenuTriggerProps {}

export interface MenuItemEvents extends BaseMenuItemEvents {}
export interface MenuRootEvents extends BaseMenuRootEvents {}
export interface MenuSubmenuRootEvents extends BaseMenuSubmenuRootEvents {}
export interface MenuTriggerEvents extends BaseMenuTriggerEvents {}

/** @internal */
export const MenuItemPropsDeclaration: PropsDeclaration<MenuItemProps> = BaseMenuItemPropsDeclaration
/** @internal */
export const MenuPopupPropsDeclaration: PropsDeclaration<MenuPopupProps> = BaseMenuPopupPropsDeclaration
/** @internal */
export const MenuPositionerPropsDeclaration: PropsDeclaration<MenuPositionerProps> = BaseMenuPositionerPropsDeclaration
/** @internal */
export const MenuRootPropsDeclaration: PropsDeclaration<MenuRootProps> = BaseMenuRootPropsDeclaration
/** @internal */
export const MenuSubmenuRootPropsDeclaration: PropsDeclaration<MenuSubmenuRootProps> = BaseMenuSubmenuRootPropsDeclaration
/** @internal */
export const MenuSubmenuTriggerPropsDeclaration: PropsDeclaration<MenuSubmenuTriggerProps> = BaseMenuSubmenuTriggerPropsDeclaration
/** @internal */
export const MenuTriggerPropsDeclaration: PropsDeclaration<MenuTriggerProps> = BaseMenuTriggerPropsDeclaration

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

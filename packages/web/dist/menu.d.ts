import { PropsDeclaration } from "@aria-ui/core";
import * as Base from "@aria-ui/elements/menu";
import { OpenChangeEvent, SelectEvent, setupMenuItem, setupMenuPopup, setupMenuPositioner, setupMenuRoot, setupMenuSubmenuRoot, setupMenuSubmenuTrigger, setupMenuTrigger } from "@aria-ui/elements/menu";
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
export declare class MenuItemElement extends Base.MenuItemElement {}
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
export declare class MenuPopupElement extends Base.MenuPopupElement {}
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
export declare class MenuPositionerElement extends Base.MenuPositionerElement {}
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
export declare class MenuRootElement extends Base.MenuRootElement {}
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
export declare class MenuSubmenuRootElement extends Base.MenuSubmenuRootElement {}
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
export declare class MenuSubmenuTriggerElement extends Base.MenuSubmenuTriggerElement {}
/**
 * `<prosekit-menu-trigger>` custom element.
 *
 * Properties: {@link MenuTriggerProps}
 *
 * Events: {@link MenuTriggerEvents}
 */
export declare class MenuTriggerElement extends Base.MenuTriggerElement {}
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
export declare const MenuItemPropsDeclaration: PropsDeclaration<MenuItemProps>;
/** @internal */
export declare const MenuPopupPropsDeclaration: PropsDeclaration<MenuPopupProps>;
/** @internal */
export declare const MenuPositionerPropsDeclaration: PropsDeclaration<MenuPositionerProps>;
/** @internal */
export declare const MenuRootPropsDeclaration: PropsDeclaration<MenuRootProps>;
/** @internal */
export declare const MenuSubmenuRootPropsDeclaration: PropsDeclaration<MenuSubmenuRootProps>;
/** @internal */
export declare const MenuSubmenuTriggerPropsDeclaration: PropsDeclaration<MenuSubmenuTriggerProps>;
/** @internal */
export declare const MenuTriggerPropsDeclaration: PropsDeclaration<MenuTriggerProps>;
export declare function registerMenuRootElement(): void;
export declare function registerMenuTriggerElement(): void;
export declare function registerMenuPositionerElement(): void;
export declare function registerMenuPopupElement(): void;
export declare function registerMenuItemElement(): void;
export declare function registerMenuSubmenuRootElement(): void;
export declare function registerMenuSubmenuTriggerElement(): void;
export { OpenChangeEvent, SelectEvent, setupMenuItem, setupMenuPopup, setupMenuPositioner, setupMenuRoot, setupMenuSubmenuRoot, setupMenuSubmenuTrigger, setupMenuTrigger };
//# sourceMappingURL=menu.d.ts.map
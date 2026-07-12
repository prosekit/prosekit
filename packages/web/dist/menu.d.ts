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
declare class MenuItemElement extends Base.MenuItemElement {}
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
declare class MenuPopupElement extends Base.MenuPopupElement {}
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
declare class MenuPositionerElement extends Base.MenuPositionerElement {}
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
declare class MenuRootElement extends Base.MenuRootElement {}
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
declare class MenuSubmenuRootElement extends Base.MenuSubmenuRootElement {}
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
declare class MenuSubmenuTriggerElement extends Base.MenuSubmenuTriggerElement {}
/**
 * `<prosekit-menu-trigger>` custom element.
 *
 * Properties: {@link MenuTriggerProps}
 *
 * Events: {@link MenuTriggerEvents}
 */
declare class MenuTriggerElement extends Base.MenuTriggerElement {}
interface MenuItemProps extends Base.MenuItemProps {}
interface MenuPopupProps extends Base.MenuPopupProps {}
interface MenuPositionerProps extends Base.MenuPositionerProps {}
interface MenuRootProps extends Base.MenuRootProps {}
interface MenuSubmenuRootProps extends Base.MenuSubmenuRootProps {}
interface MenuSubmenuTriggerProps extends Base.MenuSubmenuTriggerProps {}
interface MenuTriggerProps extends Base.MenuTriggerProps {}
interface MenuItemEvents extends Base.MenuItemEvents {}
interface MenuRootEvents extends Base.MenuRootEvents {}
interface MenuSubmenuRootEvents extends Base.MenuSubmenuRootEvents {}
interface MenuTriggerEvents extends Base.MenuTriggerEvents {}
/** @internal */
declare const MenuItemPropsDeclaration: PropsDeclaration<MenuItemProps>;
/** @internal */
declare const MenuPopupPropsDeclaration: PropsDeclaration<MenuPopupProps>;
/** @internal */
declare const MenuPositionerPropsDeclaration: PropsDeclaration<MenuPositionerProps>;
/** @internal */
declare const MenuRootPropsDeclaration: PropsDeclaration<MenuRootProps>;
/** @internal */
declare const MenuSubmenuRootPropsDeclaration: PropsDeclaration<MenuSubmenuRootProps>;
/** @internal */
declare const MenuSubmenuTriggerPropsDeclaration: PropsDeclaration<MenuSubmenuTriggerProps>;
/** @internal */
declare const MenuTriggerPropsDeclaration: PropsDeclaration<MenuTriggerProps>;
declare function registerMenuRootElement(): void;
declare function registerMenuTriggerElement(): void;
declare function registerMenuPositionerElement(): void;
declare function registerMenuPopupElement(): void;
declare function registerMenuItemElement(): void;
declare function registerMenuSubmenuRootElement(): void;
declare function registerMenuSubmenuTriggerElement(): void;
export { MenuItemElement, MenuItemEvents, MenuItemProps, MenuItemPropsDeclaration, MenuPopupElement, MenuPopupProps, MenuPopupPropsDeclaration, MenuPositionerElement, MenuPositionerProps, MenuPositionerPropsDeclaration, MenuRootElement, MenuRootEvents, MenuRootProps, MenuRootPropsDeclaration, MenuSubmenuRootElement, MenuSubmenuRootEvents, MenuSubmenuRootProps, MenuSubmenuRootPropsDeclaration, MenuSubmenuTriggerElement, MenuSubmenuTriggerProps, MenuSubmenuTriggerPropsDeclaration, MenuTriggerElement, MenuTriggerEvents, MenuTriggerProps, MenuTriggerPropsDeclaration, OpenChangeEvent, SelectEvent, registerMenuItemElement, registerMenuPopupElement, registerMenuPositionerElement, registerMenuRootElement, registerMenuSubmenuRootElement, registerMenuSubmenuTriggerElement, registerMenuTriggerElement, setupMenuItem, setupMenuPopup, setupMenuPositioner, setupMenuRoot, setupMenuSubmenuRoot, setupMenuSubmenuTrigger, setupMenuTrigger };
//# sourceMappingURL=menu.d.ts.map
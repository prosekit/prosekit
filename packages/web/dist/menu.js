import { registerCustomElement } from "@aria-ui/core";
import * as Base from "@aria-ui/elements/menu";
import { OpenChangeEvent, SelectEvent, setupMenuItem, setupMenuPopup, setupMenuPositioner, setupMenuRoot, setupMenuSubmenuRoot, setupMenuSubmenuTrigger, setupMenuTrigger } from "@aria-ui/elements/menu";
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
var MenuItemElement = class extends Base.MenuItemElement {};
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
var MenuPopupElement = class extends Base.MenuPopupElement {};
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
var MenuPositionerElement = class extends Base.MenuPositionerElement {};
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
var MenuRootElement = class extends Base.MenuRootElement {};
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
var MenuSubmenuRootElement = class extends Base.MenuSubmenuRootElement {};
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
var MenuSubmenuTriggerElement = class extends Base.MenuSubmenuTriggerElement {};
/**
* `<prosekit-menu-trigger>` custom element.
*
* Properties: {@link MenuTriggerProps}
*
* Events: {@link MenuTriggerEvents}
*/
var MenuTriggerElement = class extends Base.MenuTriggerElement {};
/** @internal */
const MenuItemPropsDeclaration = Base.MenuItemPropsDeclaration;
/** @internal */
const MenuPopupPropsDeclaration = Base.MenuPopupPropsDeclaration;
/** @internal */
const MenuPositionerPropsDeclaration = Base.MenuPositionerPropsDeclaration;
/** @internal */
const MenuRootPropsDeclaration = Base.MenuRootPropsDeclaration;
/** @internal */
const MenuSubmenuRootPropsDeclaration = Base.MenuSubmenuRootPropsDeclaration;
/** @internal */
const MenuSubmenuTriggerPropsDeclaration = Base.MenuSubmenuTriggerPropsDeclaration;
/** @internal */
const MenuTriggerPropsDeclaration = Base.MenuTriggerPropsDeclaration;
function registerMenuRootElement() {
	registerCustomElement("prosekit-menu-root", MenuRootElement);
}
function registerMenuTriggerElement() {
	registerCustomElement("prosekit-menu-trigger", MenuTriggerElement);
}
function registerMenuPositionerElement() {
	registerCustomElement("prosekit-menu-positioner", MenuPositionerElement);
}
function registerMenuPopupElement() {
	registerCustomElement("prosekit-menu-popup", MenuPopupElement);
}
function registerMenuItemElement() {
	registerCustomElement("prosekit-menu-item", MenuItemElement);
}
function registerMenuSubmenuRootElement() {
	registerCustomElement("prosekit-menu-submenu-root", MenuSubmenuRootElement);
}
function registerMenuSubmenuTriggerElement() {
	registerCustomElement("prosekit-menu-submenu-trigger", MenuSubmenuTriggerElement);
}
export { MenuItemElement, MenuItemPropsDeclaration, MenuPopupElement, MenuPopupPropsDeclaration, MenuPositionerElement, MenuPositionerPropsDeclaration, MenuRootElement, MenuRootPropsDeclaration, MenuSubmenuRootElement, MenuSubmenuRootPropsDeclaration, MenuSubmenuTriggerElement, MenuSubmenuTriggerPropsDeclaration, MenuTriggerElement, MenuTriggerPropsDeclaration, OpenChangeEvent, SelectEvent, registerMenuItemElement, registerMenuPopupElement, registerMenuPositionerElement, registerMenuRootElement, registerMenuSubmenuRootElement, registerMenuSubmenuTriggerElement, registerMenuTriggerElement, setupMenuItem, setupMenuPopup, setupMenuPositioner, setupMenuRoot, setupMenuSubmenuRoot, setupMenuSubmenuTrigger, setupMenuTrigger };

//# sourceMappingURL=menu.js.map
import { registerCustomElement } from "@aria-ui/core";
import * as Base from "@aria-ui/elements/tooltip";
import { OpenChangeEvent, setupTooltipPopup, setupTooltipPositioner, setupTooltipRoot, setupTooltipTrigger } from "@aria-ui/elements/tooltip";
/**

@module

## Anatomy

```html
<prosekit-tooltip-root>
<prosekit-tooltip-trigger>...</prosekit-tooltip-trigger>
<prosekit-tooltip-positioner>
<prosekit-tooltip-popup>...</prosekit-tooltip-popup>
</prosekit-tooltip-positioner>
</prosekit-tooltip-root>
```
*/
/**
* `<prosekit-tooltip-popup>` custom element.
*
* Properties: {@link TooltipPopupProps}
*
* Data attributes:
*
* | Attribute | Description |
* | --- | --- |
* | `data-state` | `"open"` when the tooltip is visible, `"closed"` otherwise |
*/
var TooltipPopupElement = class extends Base.TooltipPopupElement {};
/**
* `<prosekit-tooltip-positioner>` custom element.
*
* Properties: {@link TooltipPositionerProps}
*
* Data attributes:
*
* | Attribute | Description |
* | --- | --- |
* | `data-state` | `"open"` when the tooltip is visible, `"closed"` otherwise |
*
* CSS variables:
*
* | Variable | Description |
* | --- | --- |
* | `--transform-origin` | The coordinates that this element is anchored to. Useful for scale animations. |
*/
var TooltipPositionerElement = class extends Base.TooltipPositionerElement {};
/**
* `<prosekit-tooltip-root>` custom element.
*
* Properties: {@link TooltipRootProps}
*
* Events: {@link TooltipRootEvents}
*/
var TooltipRootElement = class extends Base.TooltipRootElement {};
/**
* `<prosekit-tooltip-trigger>` custom element.
*
* Properties: {@link TooltipTriggerProps}
*/
var TooltipTriggerElement = class extends Base.TooltipTriggerElement {};
/** @internal */
const TooltipPopupPropsDeclaration = Base.TooltipPopupPropsDeclaration;
/** @internal */
const TooltipPositionerPropsDeclaration = Base.TooltipPositionerPropsDeclaration;
/** @internal */
const TooltipRootPropsDeclaration = Base.TooltipRootPropsDeclaration;
/** @internal */
const TooltipTriggerPropsDeclaration = Base.TooltipTriggerPropsDeclaration;
function registerTooltipRootElement() {
	registerCustomElement("prosekit-tooltip-root", TooltipRootElement);
}
function registerTooltipTriggerElement() {
	registerCustomElement("prosekit-tooltip-trigger", TooltipTriggerElement);
}
function registerTooltipPopupElement() {
	registerCustomElement("prosekit-tooltip-popup", TooltipPopupElement);
}
function registerTooltipPositionerElement() {
	registerCustomElement("prosekit-tooltip-positioner", TooltipPositionerElement);
}
export { OpenChangeEvent, TooltipPopupElement, TooltipPopupPropsDeclaration, TooltipPositionerElement, TooltipPositionerPropsDeclaration, TooltipRootElement, TooltipRootPropsDeclaration, TooltipTriggerElement, TooltipTriggerPropsDeclaration, registerTooltipPopupElement, registerTooltipPositionerElement, registerTooltipRootElement, registerTooltipTriggerElement, setupTooltipPopup, setupTooltipPositioner, setupTooltipRoot, setupTooltipTrigger };

//# sourceMappingURL=tooltip.js.map
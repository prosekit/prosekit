import { registerCustomElement } from "@aria-ui/core";
import * as Base from "@aria-ui/elements/popover";
import { OpenChangeEvent, setupPopoverPopup, setupPopoverPositioner, setupPopoverRoot, setupPopoverTrigger } from "@aria-ui/elements/popover";
/**

@module

## Anatomy

```html
<prosekit-popover-root>
<prosekit-popover-trigger>...</prosekit-popover-trigger>
<prosekit-popover-positioner>
<prosekit-popover-popup>...</prosekit-popover-popup>
</prosekit-popover-positioner>
</prosekit-popover-root>
```
*/
/**
* `<prosekit-popover-popup>` custom element.
*
* Properties: {@link PopoverPopupProps}
*
* Data attributes:
*
* | Attribute | Description |
* | --- | --- |
* | `data-state` | `"open"` when the popover is visible, `"closed"` otherwise |
*/
var PopoverPopupElement = class extends Base.PopoverPopupElement {};
/**
* `<prosekit-popover-positioner>` custom element.
*
* Properties: {@link PopoverPositionerProps}
*
* Data attributes:
*
* | Attribute | Description |
* | --- | --- |
* | `data-state` | `"open"` when the popover is visible, `"closed"` otherwise |
*
* CSS variables:
*
* | Variable | Description |
* | --- | --- |
* | `--transform-origin` | The coordinates that this element is anchored to. Useful for scale animations. |
*/
var PopoverPositionerElement = class extends Base.PopoverPositionerElement {};
/**
* `<prosekit-popover-root>` custom element.
*
* Properties: {@link PopoverRootProps}
*
* Events: {@link PopoverRootEvents}
*/
var PopoverRootElement = class extends Base.PopoverRootElement {};
/**
* `<prosekit-popover-trigger>` custom element.
*
* Properties: {@link PopoverTriggerProps}
*
* Events: {@link PopoverTriggerEvents}
*/
var PopoverTriggerElement = class extends Base.PopoverTriggerElement {};
/** @internal */
const PopoverPopupPropsDeclaration = Base.PopoverPopupPropsDeclaration;
/** @internal */
const PopoverPositionerPropsDeclaration = Base.PopoverPositionerPropsDeclaration;
/** @internal */
const PopoverRootPropsDeclaration = Base.PopoverRootPropsDeclaration;
/** @internal */
const PopoverTriggerPropsDeclaration = Base.PopoverTriggerPropsDeclaration;
function registerPopoverRootElement() {
	registerCustomElement("prosekit-popover-root", PopoverRootElement);
}
function registerPopoverTriggerElement() {
	registerCustomElement("prosekit-popover-trigger", PopoverTriggerElement);
}
function registerPopoverPopupElement() {
	registerCustomElement("prosekit-popover-popup", PopoverPopupElement);
}
function registerPopoverPositionerElement() {
	registerCustomElement("prosekit-popover-positioner", PopoverPositionerElement);
}
export { OpenChangeEvent, PopoverPopupElement, PopoverPopupPropsDeclaration, PopoverPositionerElement, PopoverPositionerPropsDeclaration, PopoverRootElement, PopoverRootPropsDeclaration, PopoverTriggerElement, PopoverTriggerPropsDeclaration, registerPopoverPopupElement, registerPopoverPositionerElement, registerPopoverRootElement, registerPopoverTriggerElement, setupPopoverPopup, setupPopoverPositioner, setupPopoverRoot, setupPopoverTrigger };

//# sourceMappingURL=popover.js.map
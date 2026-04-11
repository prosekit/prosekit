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

import { registerCustomElement, type PropsDeclaration } from '@aria-ui/core'
import * as Base from '@aria-ui/elements/tooltip'

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
export class TooltipPopupElement extends Base.TooltipPopupElement {}

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
export class TooltipPositionerElement extends Base.TooltipPositionerElement {}

/**
 * `<prosekit-tooltip-root>` custom element.
 *
 * Properties: {@link TooltipRootProps}
 *
 * Events: {@link TooltipRootEvents}
 */
export class TooltipRootElement extends Base.TooltipRootElement {}

/**
 * `<prosekit-tooltip-trigger>` custom element.
 *
 * Properties: {@link TooltipTriggerProps}
 */
export class TooltipTriggerElement extends Base.TooltipTriggerElement {}

export interface TooltipPopupProps extends Base.TooltipPopupProps {}
export interface TooltipPositionerProps extends Base.TooltipPositionerProps {}
export interface TooltipRootProps extends Base.TooltipRootProps {}
export interface TooltipTriggerProps extends Base.TooltipTriggerProps {}

export interface TooltipRootEvents extends Base.TooltipRootEvents {}

/** @internal */
export const TooltipPopupPropsDeclaration: PropsDeclaration<TooltipPopupProps> = Base.TooltipPopupPropsDeclaration
/** @internal */
export const TooltipPositionerPropsDeclaration: PropsDeclaration<TooltipPositionerProps> = Base.TooltipPositionerPropsDeclaration
/** @internal */
export const TooltipRootPropsDeclaration: PropsDeclaration<TooltipRootProps> = Base.TooltipRootPropsDeclaration
/** @internal */
export const TooltipTriggerPropsDeclaration: PropsDeclaration<TooltipTriggerProps> = Base.TooltipTriggerPropsDeclaration

export function registerTooltipRootElement(): void {
  registerCustomElement('prosekit-tooltip-root', TooltipRootElement)
}
export function registerTooltipTriggerElement(): void {
  registerCustomElement('prosekit-tooltip-trigger', TooltipTriggerElement)
}
export function registerTooltipPopupElement(): void {
  registerCustomElement('prosekit-tooltip-popup', TooltipPopupElement)
}
export function registerTooltipPositionerElement(): void {
  registerCustomElement('prosekit-tooltip-positioner', TooltipPositionerElement)
}

export {
  OpenChangeEvent,
  setupTooltipPopup,
  setupTooltipPositioner,
  setupTooltipRoot,
  setupTooltipTrigger,
} from '@aria-ui/elements/tooltip'

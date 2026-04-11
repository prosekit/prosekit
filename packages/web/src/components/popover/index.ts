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

import { registerCustomElement, type PropsDeclaration } from '@aria-ui/core'
import * as Base from '@aria-ui/elements/popover'

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
export class PopoverPopupElement extends Base.PopoverPopupElement {}

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
export class PopoverPositionerElement extends Base.PopoverPositionerElement {}

/**
 * `<prosekit-popover-root>` custom element.
 *
 * Properties: {@link PopoverRootProps}
 *
 * Events: {@link PopoverRootEvents}
 */
export class PopoverRootElement extends Base.PopoverRootElement {}

/**
 * `<prosekit-popover-trigger>` custom element.
 *
 * Properties: {@link PopoverTriggerProps}
 *
 * Events: {@link PopoverTriggerEvents}
 */
export class PopoverTriggerElement extends Base.PopoverTriggerElement {}

export interface PopoverPopupProps extends Base.PopoverPopupProps {}
export interface PopoverPositionerProps extends Base.PopoverPositionerProps {}
export interface PopoverRootProps extends Base.PopoverRootProps {}
export interface PopoverTriggerProps extends Base.PopoverTriggerProps {}

export interface PopoverRootEvents extends Base.PopoverRootEvents {}
export interface PopoverTriggerEvents extends Base.PopoverTriggerEvents {}

/** @internal */
export const PopoverPopupPropsDeclaration: PropsDeclaration<PopoverPopupProps> = Base.PopoverPopupPropsDeclaration
/** @internal */
export const PopoverPositionerPropsDeclaration: PropsDeclaration<PopoverPositionerProps> = Base.PopoverPositionerPropsDeclaration
/** @internal */
export const PopoverRootPropsDeclaration: PropsDeclaration<PopoverRootProps> = Base.PopoverRootPropsDeclaration
/** @internal */
export const PopoverTriggerPropsDeclaration: PropsDeclaration<PopoverTriggerProps> = Base.PopoverTriggerPropsDeclaration

export function registerPopoverRootElement(): void {
  registerCustomElement('prosekit-popover-root', PopoverRootElement)
}
export function registerPopoverTriggerElement(): void {
  registerCustomElement('prosekit-popover-trigger', PopoverTriggerElement)
}
export function registerPopoverPopupElement(): void {
  registerCustomElement('prosekit-popover-popup', PopoverPopupElement)
}
export function registerPopoverPositionerElement(): void {
  registerCustomElement('prosekit-popover-positioner', PopoverPositionerElement)
}

export {
  OpenChangeEvent,
  setupPopoverPopup,
  setupPopoverPositioner,
  setupPopoverRoot,
  setupPopoverTrigger,
} from '@aria-ui/elements/popover'

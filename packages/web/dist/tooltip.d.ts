import { PropsDeclaration } from "@aria-ui/core";
import * as Base from "@aria-ui/elements/tooltip";
import { OpenChangeEvent, setupTooltipPopup, setupTooltipPositioner, setupTooltipRoot, setupTooltipTrigger } from "@aria-ui/elements/tooltip";
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
export declare class TooltipPopupElement extends Base.TooltipPopupElement {}
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
export declare class TooltipPositionerElement extends Base.TooltipPositionerElement {}
/**
 * `<prosekit-tooltip-root>` custom element.
 *
 * Properties: {@link TooltipRootProps}
 *
 * Events: {@link TooltipRootEvents}
 */
export declare class TooltipRootElement extends Base.TooltipRootElement {}
/**
 * `<prosekit-tooltip-trigger>` custom element.
 *
 * Properties: {@link TooltipTriggerProps}
 */
export declare class TooltipTriggerElement extends Base.TooltipTriggerElement {}
export interface TooltipPopupProps extends Base.TooltipPopupProps {}
export interface TooltipPositionerProps extends Base.TooltipPositionerProps {}
export interface TooltipRootProps extends Base.TooltipRootProps {}
export interface TooltipTriggerProps extends Base.TooltipTriggerProps {}
export interface TooltipRootEvents extends Base.TooltipRootEvents {}
/** @internal */
export declare const TooltipPopupPropsDeclaration: PropsDeclaration<TooltipPopupProps>;
/** @internal */
export declare const TooltipPositionerPropsDeclaration: PropsDeclaration<TooltipPositionerProps>;
/** @internal */
export declare const TooltipRootPropsDeclaration: PropsDeclaration<TooltipRootProps>;
/** @internal */
export declare const TooltipTriggerPropsDeclaration: PropsDeclaration<TooltipTriggerProps>;
export declare function registerTooltipRootElement(): void;
export declare function registerTooltipTriggerElement(): void;
export declare function registerTooltipPopupElement(): void;
export declare function registerTooltipPositionerElement(): void;
export { OpenChangeEvent, setupTooltipPopup, setupTooltipPositioner, setupTooltipRoot, setupTooltipTrigger };
//# sourceMappingURL=tooltip.d.ts.map
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
declare class TooltipPopupElement extends Base.TooltipPopupElement {}
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
declare class TooltipPositionerElement extends Base.TooltipPositionerElement {}
/**
 * `<prosekit-tooltip-root>` custom element.
 *
 * Properties: {@link TooltipRootProps}
 *
 * Events: {@link TooltipRootEvents}
 */
declare class TooltipRootElement extends Base.TooltipRootElement {}
/**
 * `<prosekit-tooltip-trigger>` custom element.
 *
 * Properties: {@link TooltipTriggerProps}
 */
declare class TooltipTriggerElement extends Base.TooltipTriggerElement {}
interface TooltipPopupProps extends Base.TooltipPopupProps {}
interface TooltipPositionerProps extends Base.TooltipPositionerProps {}
interface TooltipRootProps extends Base.TooltipRootProps {}
interface TooltipTriggerProps extends Base.TooltipTriggerProps {}
interface TooltipRootEvents extends Base.TooltipRootEvents {}
/** @internal */
declare const TooltipPopupPropsDeclaration: PropsDeclaration<TooltipPopupProps>;
/** @internal */
declare const TooltipPositionerPropsDeclaration: PropsDeclaration<TooltipPositionerProps>;
/** @internal */
declare const TooltipRootPropsDeclaration: PropsDeclaration<TooltipRootProps>;
/** @internal */
declare const TooltipTriggerPropsDeclaration: PropsDeclaration<TooltipTriggerProps>;
declare function registerTooltipRootElement(): void;
declare function registerTooltipTriggerElement(): void;
declare function registerTooltipPopupElement(): void;
declare function registerTooltipPositionerElement(): void;
export { OpenChangeEvent, TooltipPopupElement, TooltipPopupProps, TooltipPopupPropsDeclaration, TooltipPositionerElement, TooltipPositionerProps, TooltipPositionerPropsDeclaration, TooltipRootElement, TooltipRootEvents, TooltipRootProps, TooltipRootPropsDeclaration, TooltipTriggerElement, TooltipTriggerProps, TooltipTriggerPropsDeclaration, registerTooltipPopupElement, registerTooltipPositionerElement, registerTooltipRootElement, registerTooltipTriggerElement, setupTooltipPopup, setupTooltipPositioner, setupTooltipRoot, setupTooltipTrigger };
//# sourceMappingURL=tooltip.d.ts.map
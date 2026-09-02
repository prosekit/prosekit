import { PropsDeclaration } from "@aria-ui/core";
import * as Base from "@aria-ui/elements/popover";
import { OpenChangeEvent, setupPopoverPopup, setupPopoverPositioner, setupPopoverRoot, setupPopoverTrigger } from "@aria-ui/elements/popover";
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
export declare class PopoverPopupElement extends Base.PopoverPopupElement {}
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
export declare class PopoverPositionerElement extends Base.PopoverPositionerElement {}
/**
 * `<prosekit-popover-root>` custom element.
 *
 * Properties: {@link PopoverRootProps}
 *
 * Events: {@link PopoverRootEvents}
 */
export declare class PopoverRootElement extends Base.PopoverRootElement {}
/**
 * `<prosekit-popover-trigger>` custom element.
 *
 * Properties: {@link PopoverTriggerProps}
 *
 * Events: {@link PopoverTriggerEvents}
 */
export declare class PopoverTriggerElement extends Base.PopoverTriggerElement {}
export interface PopoverPopupProps extends Base.PopoverPopupProps {}
export interface PopoverPositionerProps extends Base.PopoverPositionerProps {}
export interface PopoverRootProps extends Base.PopoverRootProps {}
export interface PopoverTriggerProps extends Base.PopoverTriggerProps {}
export interface PopoverRootEvents extends Base.PopoverRootEvents {}
export interface PopoverTriggerEvents extends Base.PopoverTriggerEvents {}
/** @internal */
export declare const PopoverPopupPropsDeclaration: PropsDeclaration<PopoverPopupProps>;
/** @internal */
export declare const PopoverPositionerPropsDeclaration: PropsDeclaration<PopoverPositionerProps>;
/** @internal */
export declare const PopoverRootPropsDeclaration: PropsDeclaration<PopoverRootProps>;
/** @internal */
export declare const PopoverTriggerPropsDeclaration: PropsDeclaration<PopoverTriggerProps>;
export declare function registerPopoverRootElement(): void;
export declare function registerPopoverTriggerElement(): void;
export declare function registerPopoverPopupElement(): void;
export declare function registerPopoverPositionerElement(): void;
export { OpenChangeEvent, setupPopoverPopup, setupPopoverPositioner, setupPopoverRoot, setupPopoverTrigger };
//# sourceMappingURL=popover.d.ts.map
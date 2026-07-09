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
declare class PopoverPopupElement extends Base.PopoverPopupElement {}
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
declare class PopoverPositionerElement extends Base.PopoverPositionerElement {}
/**
 * `<prosekit-popover-root>` custom element.
 *
 * Properties: {@link PopoverRootProps}
 *
 * Events: {@link PopoverRootEvents}
 */
declare class PopoverRootElement extends Base.PopoverRootElement {}
/**
 * `<prosekit-popover-trigger>` custom element.
 *
 * Properties: {@link PopoverTriggerProps}
 *
 * Events: {@link PopoverTriggerEvents}
 */
declare class PopoverTriggerElement extends Base.PopoverTriggerElement {}
interface PopoverPopupProps extends Base.PopoverPopupProps {}
interface PopoverPositionerProps extends Base.PopoverPositionerProps {}
interface PopoverRootProps extends Base.PopoverRootProps {}
interface PopoverTriggerProps extends Base.PopoverTriggerProps {}
interface PopoverRootEvents extends Base.PopoverRootEvents {}
interface PopoverTriggerEvents extends Base.PopoverTriggerEvents {}
/** @internal */
declare const PopoverPopupPropsDeclaration: PropsDeclaration<PopoverPopupProps>;
/** @internal */
declare const PopoverPositionerPropsDeclaration: PropsDeclaration<PopoverPositionerProps>;
/** @internal */
declare const PopoverRootPropsDeclaration: PropsDeclaration<PopoverRootProps>;
/** @internal */
declare const PopoverTriggerPropsDeclaration: PropsDeclaration<PopoverTriggerProps>;
declare function registerPopoverRootElement(): void;
declare function registerPopoverTriggerElement(): void;
declare function registerPopoverPopupElement(): void;
declare function registerPopoverPositionerElement(): void;
export { OpenChangeEvent, PopoverPopupElement, PopoverPopupProps, PopoverPopupPropsDeclaration, PopoverPositionerElement, PopoverPositionerProps, PopoverPositionerPropsDeclaration, PopoverRootElement, PopoverRootEvents, PopoverRootProps, PopoverRootPropsDeclaration, PopoverTriggerElement, PopoverTriggerEvents, PopoverTriggerProps, PopoverTriggerPropsDeclaration, registerPopoverPopupElement, registerPopoverPositionerElement, registerPopoverRootElement, registerPopoverTriggerElement, setupPopoverPopup, setupPopoverPositioner, setupPopoverRoot, setupPopoverTrigger };
//# sourceMappingURL=popover.d.ts.map
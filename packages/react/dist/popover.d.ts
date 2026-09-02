import { ForwardRefExoticComponent, HTMLAttributes, RefAttributes } from "react";
import { PopoverPopupElement, PopoverPositionerElement, PopoverPositionerProps as PopoverPositionerProps$1, PopoverRootElement, PopoverRootEvents, PopoverRootProps as PopoverRootProps$1, PopoverTriggerElement, PopoverTriggerEvents, PopoverTriggerProps as PopoverTriggerProps$1 } from "@prosekit/web/popover";
/** Props for the {@link PopoverPopup} React component. */
interface PopoverPopupProps {}
/** A React component that renders an `prosekit-popover-popup` custom element. */
declare const PopoverPopup: ForwardRefExoticComponent<PopoverPopupProps & HTMLAttributes<PopoverPopupElement> & RefAttributes<PopoverPopupElement>>;
/** Props for the {@link PopoverPositioner} React component. */
interface PopoverPositionerProps {
  /**
   * The strategy to use for positioning
   *
   * @default "absolute"
   */
  strategy?: PopoverPositionerProps$1['strategy'];
  /**
   * The initial placement of the floating element
   *
   * @default "top"
   */
  placement?: PopoverPositionerProps$1['placement'];
  /**
   * Options to activate auto-update listeners
   *
   * @see https://floating-ui.com/docs/autoUpdate
   *
   * @default true
   */
  autoUpdate?: PopoverPositionerProps$1['autoUpdate'];
  /**
   * Whether to use the browser Popover API to place the floating element on
   * top of other page content.
   *
   * @default true
   */
  hoist?: PopoverPositionerProps$1['hoist'];
  /**
   * The distance between the reference and floating element.
   *
   * @default 6
   */
  offset?: PopoverPositionerProps$1['offset'];
  /**
   * Whether to flip the `placement` in order to keep it in view when the
   * preferred placement(s) will overflow the clipping boundary. You can also
   * provide an array of placements to try sequentially if the preferred
   * `placement` does not fit.
   *
   * @default true
   */
  flip?: PopoverPositionerProps$1['flip'];
  /**
   * Whether the floating element should shift to keep it in view.
   *
   * @default true
   */
  shift?: PopoverPositionerProps$1['shift'];
  /**
   * Whether the floating element can overlap the reference element to keep it
   * in view.
   *
   * @default false
   */
  overlap?: PopoverPositionerProps$1['overlap'];
  /**
   * Whether to constrain the floating element's width and height to not exceed
   * the viewport.
   *
   * @default false
   */
  fitViewport?: PopoverPositionerProps$1['fitViewport'];
  /**
   * Whether to constrain the floating element's width so that it matches the
   * reference element.
   *
   * @default false
   */
  sameWidth?: PopoverPositionerProps$1['sameWidth'];
  /**
   * Whether to constrain the floating element's height so that it matches the
   * reference element.
   *
   * @default false
   */
  sameHeight?: PopoverPositionerProps$1['sameHeight'];
  /**
   * Whether to improve positioning for inline reference elements that span over
   * multiple lines.
   *
   * @default false
   */
  inline?: PopoverPositionerProps$1['inline'];
  /**
   * Whether to hide the floating element when the reference element or the
   * floating element is fully clipped.
   *
   * @default false
   */
  hide?: PopoverPositionerProps$1['hide'];
  /**
   * Describes the clipping element(s) or area that overflow will be checked relative to.
   * Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.
   *
   * @default 'clippingAncestors'
   */
  boundary?: PopoverPositionerProps$1['boundary'];
  /**
   * Describes the root boundary that the element will be checked for overflow relative to.
   * Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.
   *
   * @default 'viewport'
   */
  rootBoundary?: PopoverPositionerProps$1['rootBoundary'];
  /**
   * Describes the virtual padding around the boundary to check for overflow.
   * Please see https://floating-ui.com/docs/detectoverflow#padding for more information.
   *
   * @default 4
   */
  overflowPadding?: PopoverPositionerProps$1['overflowPadding'];
  /**
   * The element that will be used to check for overflow. Please see
   * https://floating-ui.com/docs/detectoverflow#elementcontext for more
   * information.
   *
   * @default 'floating'
   */
  elementContext?: PopoverPositionerProps$1['elementContext'];
  /**
   * Whether to check the alternate elementContext's boundary. Please see
   * https://floating-ui.com/docs/detectoverflow#altboundary for more
   * information.
   *
   * @default false
   */
  altBoundary?: PopoverPositionerProps$1['altBoundary'];
}
/** A React component that renders an `prosekit-popover-positioner` custom element. */
declare const PopoverPositioner: ForwardRefExoticComponent<PopoverPositionerProps & HTMLAttributes<PopoverPositionerElement> & RefAttributes<PopoverPositionerElement>>;
/** Props for the {@link PopoverRoot} React component. */
interface PopoverRootProps {
  /**
   * Whether the popover should be modal.
   * When true, the popover will trap focus and prevent interaction with the rest of the page.
   *
   * @default false
   */
  modal?: PopoverRootProps$1['modal'];
  /**
   * Whether the overlay is initially open.
   * @default false
   */
  defaultOpen?: PopoverRootProps$1['defaultOpen'];
  /**
   * Whether the overlay is currently open.
   * @default null
   */
  open?: PopoverRootProps$1['open'];
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: PopoverRootProps$1['disabled'];
  /** Emitted when the popover is opened or closed. */
  onOpenChange?: (event: PopoverRootEvents['openChange']) => void;
}
/** A React component that renders an `prosekit-popover-root` custom element. */
declare const PopoverRoot: ForwardRefExoticComponent<PopoverRootProps & HTMLAttributes<PopoverRootElement> & RefAttributes<PopoverRootElement>>;
/** Props for the {@link PopoverTrigger} React component. */
interface PopoverTriggerProps {
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: PopoverTriggerProps$1['disabled'];
  /**
   * Whether the popover should also open when the trigger is hovered.
   * @default false
   */
  openOnHover?: PopoverTriggerProps$1['openOnHover'];
  /**
   * The delay in milliseconds before opening the popover when hovering.
   * Only applies when `openOnHover` is true.
   * @default 300
   */
  delay?: PopoverTriggerProps$1['delay'];
  /**
   * The delay in milliseconds before closing the popover when hover ends.
   * Only applies when `openOnHover` is true.
   * @default 0
   */
  closeDelay?: PopoverTriggerProps$1['closeDelay'];
  /** Emitted when the popover is opened or closed. */
  onOpenChange?: (event: PopoverTriggerEvents['openChange']) => void;
}
/** A React component that renders an `prosekit-popover-trigger` custom element. */
declare const PopoverTrigger: ForwardRefExoticComponent<PopoverTriggerProps & HTMLAttributes<PopoverTriggerElement> & RefAttributes<PopoverTriggerElement>>;
export { PopoverPopup, type PopoverPopupProps, PopoverPositioner, type PopoverPositionerProps, PopoverRoot, type PopoverRootProps, PopoverTrigger, type PopoverTriggerProps };
//# sourceMappingURL=popover.d.ts.map
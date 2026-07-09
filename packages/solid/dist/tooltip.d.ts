import { Component, JSX } from "solid-js";
import { TooltipPopupElement, TooltipPositionerElement, TooltipPositionerProps as TooltipPositionerProps$1, TooltipRootElement, TooltipRootEvents, TooltipRootProps as TooltipRootProps$1, TooltipTriggerElement, TooltipTriggerProps as TooltipTriggerProps$1 } from "@prosekit/web/tooltip";
/** Props for the {@link TooltipPopup} Solid component. */
interface TooltipPopupProps {}
/** A Solid component that renders an `prosekit-tooltip-popup` custom element. */
declare const TooltipPopup: Component<TooltipPopupProps & JSX.HTMLAttributes<TooltipPopupElement>>;
/** Props for the {@link TooltipPositioner} Solid component. */
interface TooltipPositionerProps {
  /**
   * The strategy to use for positioning
   *
   * @default "absolute"
   */
  strategy?: TooltipPositionerProps$1['strategy'];
  /**
   * The initial placement of the floating element
   *
   * @default "top"
   */
  placement?: TooltipPositionerProps$1['placement'];
  /**
   * Options to activate auto-update listeners
   *
   * @see https://floating-ui.com/docs/autoUpdate
   *
   * @default true
   */
  autoUpdate?: TooltipPositionerProps$1['autoUpdate'];
  /**
   * Whether to use the browser Popover API to place the floating element on
   * top of other page content.
   *
   * @default true
   */
  hoist?: TooltipPositionerProps$1['hoist'];
  /**
   * The distance between the reference and floating element.
   *
   * @default 6
   */
  offset?: TooltipPositionerProps$1['offset'];
  /**
   * Whether to flip the `placement` in order to keep it in view when the
   * preferred placement(s) will overflow the clipping boundary. You can also
   * provide an array of placements to try sequentially if the preferred
   * `placement` does not fit.
   *
   * @default true
   */
  flip?: TooltipPositionerProps$1['flip'];
  /**
   * Whether the floating element should shift to keep it in view.
   *
   * @default true
   */
  shift?: TooltipPositionerProps$1['shift'];
  /**
   * Whether the floating element can overlap the reference element to keep it
   * in view.
   *
   * @default false
   */
  overlap?: TooltipPositionerProps$1['overlap'];
  /**
   * Whether to constrain the floating element's width and height to not exceed
   * the viewport.
   *
   * @default false
   */
  fitViewport?: TooltipPositionerProps$1['fitViewport'];
  /**
   * Whether to constrain the floating element's width so that it matches the
   * reference element.
   *
   * @default false
   */
  sameWidth?: TooltipPositionerProps$1['sameWidth'];
  /**
   * Whether to constrain the floating element's height so that it matches the
   * reference element.
   *
   * @default false
   */
  sameHeight?: TooltipPositionerProps$1['sameHeight'];
  /**
   * Whether to improve positioning for inline reference elements that span over
   * multiple lines.
   *
   * @default false
   */
  inline?: TooltipPositionerProps$1['inline'];
  /**
   * Whether to hide the floating element when the reference element or the
   * floating element is fully clipped.
   *
   * @default false
   */
  hide?: TooltipPositionerProps$1['hide'];
  /**
   * Describes the clipping element(s) or area that overflow will be checked relative to.
   * Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.
   *
   * @default 'clippingAncestors'
   */
  boundary?: TooltipPositionerProps$1['boundary'];
  /**
   * Describes the root boundary that the element will be checked for overflow relative to.
   * Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.
   *
   * @default 'viewport'
   */
  rootBoundary?: TooltipPositionerProps$1['rootBoundary'];
  /**
   * Describes the virtual padding around the boundary to check for overflow.
   * Please see https://floating-ui.com/docs/detectoverflow#padding for more information.
   *
   * @default 4
   */
  overflowPadding?: TooltipPositionerProps$1['overflowPadding'];
  /**
   * The element that will be used to check for overflow. Please see
   * https://floating-ui.com/docs/detectoverflow#elementcontext for more
   * information.
   *
   * @default 'floating'
   */
  elementContext?: TooltipPositionerProps$1['elementContext'];
  /**
   * Whether to check the alternate elementContext's boundary. Please see
   * https://floating-ui.com/docs/detectoverflow#altboundary for more
   * information.
   *
   * @default false
   */
  altBoundary?: TooltipPositionerProps$1['altBoundary'];
}
/** A Solid component that renders an `prosekit-tooltip-positioner` custom element. */
declare const TooltipPositioner: Component<TooltipPositionerProps & JSX.HTMLAttributes<TooltipPositionerElement>>;
/** Props for the {@link TooltipRoot} Solid component. */
interface TooltipRootProps {
  /**
   * Whether the overlay is initially open.
   * @default false
   */
  defaultOpen?: TooltipRootProps$1['defaultOpen'];
  /**
   * Whether the overlay is currently open.
   * @default null
   */
  open?: TooltipRootProps$1['open'];
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: TooltipRootProps$1['disabled'];
  /** Emitted when the tooltip is opened or closed. */
  onOpenChange?: (event: TooltipRootEvents['openChange']) => void;
}
/** A Solid component that renders an `prosekit-tooltip-root` custom element. */
declare const TooltipRoot: Component<TooltipRootProps & JSX.HTMLAttributes<TooltipRootElement>>;
/** Props for the {@link TooltipTrigger} Solid component. */
interface TooltipTriggerProps {
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: TooltipTriggerProps$1['disabled'];
  /**
   * The delay in milliseconds before opening the tooltip on hover.
   * @default 600
   */
  openDelay?: TooltipTriggerProps$1['openDelay'];
  /**
   * The delay in milliseconds before closing the tooltip when hover/focus ends.
   * @default 0
   */
  closeDelay?: TooltipTriggerProps$1['closeDelay'];
}
/** A Solid component that renders an `prosekit-tooltip-trigger` custom element. */
declare const TooltipTrigger: Component<TooltipTriggerProps & JSX.HTMLAttributes<TooltipTriggerElement>>;
export { TooltipPopup, type TooltipPopupProps, TooltipPositioner, type TooltipPositionerProps, TooltipRoot, type TooltipRootProps, TooltipTrigger, type TooltipTriggerProps };
//# sourceMappingURL=tooltip.d.ts.map
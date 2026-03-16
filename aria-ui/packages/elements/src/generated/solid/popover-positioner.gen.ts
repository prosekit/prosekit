import {
  registerPopoverPositionerElement,
  type PopoverPositionerElement,
  type PopoverPositionerProps as PopoverPositionerElementProps,
} from "../../popover/popover-positioner";
import { mergeProps, splitProps } from "solid-js";
import type { Component, JSX } from "solid-js";
import h from "solid-js/h";

/** Props for the {@link PopoverPositioner} Solid component. */
export interface PopoverPositionerProps extends JSX.HTMLAttributes<PopoverPositionerElement> {
  /**
   * The strategy to use for positioning
   *
   * @default "absolute"
   */
  strategy?: PopoverPositionerElementProps["strategy"];
  /**
   * The initial placement of the floating element
   *
   * @default "top"
   */
  placement?: PopoverPositionerElementProps["placement"];
  /**
   * Options to activate auto-update listeners
   *
   * @see https://floating-ui.com/docs/autoUpdate
   *
   * @default true
   */
  autoUpdate?: PopoverPositionerElementProps["autoUpdate"];
  /**
   * Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
   * to place the floating element on top of other page content. When enabled,
   * the floating element won't be clipped by an ancestor. This provides a
   * similar result to React's `<Portals>` or Vue's `<Teleport>`.
   *
   * @default true
   */
  hoist?: PopoverPositionerElementProps["hoist"];
  /**
   * The distance between the reference and floating element.
   *
   * @default 6
   */
  offset?: PopoverPositionerElementProps["offset"];
  /**
   * Whether to flip the `placement` in order to keep it in view when the
   * preferred placement(s) will overflow the clipping boundary. You can also
   * provide an array of placements to try sequentially if the preferred
   * `placement` does not fit.
   *
   * @default true
   */
  flip?: PopoverPositionerElementProps["flip"];
  /**
   * Whether the floating element should shift to keep it in view.
   *
   * @default true
   */
  shift?: PopoverPositionerElementProps["shift"];
  /**
   * Whether the floating element can overlap the reference element to keep it
   * in view.
   *
   * @default false
   */
  overlap?: PopoverPositionerElementProps["overlap"];
  /**
   * Whether to constrain the floating element's width and height to not exceed
   * the viewport.
   *
   * @default false
   */
  fitViewport?: PopoverPositionerElementProps["fitViewport"];
  /**
   * Whether to constrain the floating element's width so that it matches the
   * reference element.
   *
   * @default false
   */
  sameWidth?: PopoverPositionerElementProps["sameWidth"];
  /**
   * Whether to constrain the floating element's height so that it matches the
   * reference element.
   *
   * @default false
   */
  sameHeight?: PopoverPositionerElementProps["sameHeight"];
  /**
   * Whether to improve positioning for inline reference elements that span over
   * multiple lines.
   *
   * @default false
   */
  inline?: PopoverPositionerElementProps["inline"];
  /**
   * Whether to hide the floating element when the reference element or the
   * floating element is fully clipped.
   *
   * @default false
   */
  hide?: PopoverPositionerElementProps["hide"];
  /**
   * Describes the clipping element(s) or area that overflow will be checked relative to.
   * Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.
   *
   * @default 'clippingAncestors'
   */
  boundary?: PopoverPositionerElementProps["boundary"];
  /**
   * Describes the root boundary that the element will be checked for overflow relative to.
   * Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.
   *
   * @default 'viewport'
   */
  rootBoundary?: PopoverPositionerElementProps["rootBoundary"];
  /**
   * Describes the virtual padding around the boundary to check for overflow.
   * Please see https://floating-ui.com/docs/detectoverflow#padding for more information.
   *
   * @default 4
   */
  overflowPadding?: PopoverPositionerElementProps["overflowPadding"];
  /**
   * The element that will be used to check for overflow. Please see
   * https://floating-ui.com/docs/detectoverflow#elementcontext for more
   * information.
   *
   * @default 'floating'
   */
  elementContext?: PopoverPositionerElementProps["elementContext"];
  /**
   * Whether to check the alternate elementContext’s boundary. Please see
   * https://floating-ui.com/docs/detectoverflow#altboundary for more
   * information.
   *
   * @default false
   */
  altBoundary?: PopoverPositionerElementProps["altBoundary"];
}

export const PopoverPositioner: Component<PopoverPositionerProps> = (
  props,
): any => {
  registerPopoverPositionerElement();

  const [elementProps, restProps] = splitProps(props, [
    "strategy",
    "placement",
    "autoUpdate",
    "hoist",
    "offset",
    "flip",
    "shift",
    "overlap",
    "fitViewport",
    "sameWidth",
    "sameHeight",
    "inline",
    "hide",
    "boundary",
    "rootBoundary",
    "overflowPadding",
    "elementContext",
    "altBoundary",
  ]);

  return h(
    "aria-ui-popover-positioner",
    mergeProps(restProps, {
      "prop:strategy": () => elementProps.strategy,
      "prop:placement": () => elementProps.placement,
      "prop:autoUpdate": () => elementProps.autoUpdate,
      "prop:hoist": () => elementProps.hoist,
      "prop:offset": () => elementProps.offset,
      "prop:flip": () => elementProps.flip,
      "prop:shift": () => elementProps.shift,
      "prop:overlap": () => elementProps.overlap,
      "prop:fitViewport": () => elementProps.fitViewport,
      "prop:sameWidth": () => elementProps.sameWidth,
      "prop:sameHeight": () => elementProps.sameHeight,
      "prop:inline": () => elementProps.inline,
      "prop:hide": () => elementProps.hide,
      "prop:boundary": () => elementProps.boundary,
      "prop:rootBoundary": () => elementProps.rootBoundary,
      "prop:overflowPadding": () => elementProps.overflowPadding,
      "prop:elementContext": () => elementProps.elementContext,
      "prop:altBoundary": () => elementProps.altBoundary,
    }),
  );
};

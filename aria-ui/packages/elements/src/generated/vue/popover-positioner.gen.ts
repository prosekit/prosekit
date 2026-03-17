import {
  defineComponent,
  h,
  type DefineSetupFnComponent,
  type HTMLAttributes,
} from "vue";
import {
  registerPopoverPositionerElement,
  type PopoverPositionerProps as PopoverPositionerElementProps,
} from "../../popover/index.ts";

/**
 * Props for the {@link PopoverPositioner} Vue component.
 *
 * @public
 */
export interface PopoverPositionerProps {
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
   * Whether to use the browser Popover API to place the floating element on
   * top of other page content.
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
   * Whether to check the alternate elementContext's boundary. Please see
   * https://floating-ui.com/docs/detectoverflow#altboundary for more
   * information.
   *
   * @default false
   */
  altBoundary?: PopoverPositionerElementProps["altBoundary"];
}

/**
 * A Vue component that renders an `aria-ui-popover-positioner` custom element.
 *
 * @public
 */
export const PopoverPositioner: DefineSetupFnComponent<
  PopoverPositionerProps & HTMLAttributes
> = defineComponent<PopoverPositionerProps & HTMLAttributes>(
  (props, { slots }) => {
    registerPopoverPositionerElement();

    return () => {
      const {
        strategy: p0,
        placement: p1,
        autoUpdate: p2,
        hoist: p3,
        offset: p4,
        flip: p5,
        shift: p6,
        overlap: p7,
        fitViewport: p8,
        sameWidth: p9,
        sameHeight: p10,
        inline: p11,
        hide: p12,
        boundary: p13,
        rootBoundary: p14,
        overflowPadding: p15,
        elementContext: p16,
        altBoundary: p17,
        ...restProps
      } = props;
      return h(
        "aria-ui-popover-positioner",
        {
          ...restProps,
          "strategy.prop": p0,
          "placement.prop": p1,
          "autoUpdate.prop": p2,
          "hoist.prop": p3,
          "offset.prop": p4,
          "flip.prop": p5,
          "shift.prop": p6,
          "overlap.prop": p7,
          "fitViewport.prop": p8,
          "sameWidth.prop": p9,
          "sameHeight.prop": p10,
          "inline.prop": p11,
          "hide.prop": p12,
          "boundary.prop": p13,
          "rootBoundary.prop": p14,
          "overflowPadding.prop": p15,
          "elementContext.prop": p16,
          "altBoundary.prop": p17,
        },
        slots.default?.(),
      );
    };
  },
  {
    props: [
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
    ],
  },
);

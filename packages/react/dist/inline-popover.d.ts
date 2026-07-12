import { ForwardRefExoticComponent, HTMLAttributes, RefAttributes } from "react";
import { InlinePopoverPopupElement, InlinePopoverPositionerElement, InlinePopoverPositionerProps as InlinePopoverPositionerProps$1, InlinePopoverRootElement, InlinePopoverRootEvents, InlinePopoverRootProps as InlinePopoverRootProps$1 } from "@prosekit/web/inline-popover";
/** Props for the {@link InlinePopoverPopup} React component. */
interface InlinePopoverPopupProps {}
/** A React component that renders an `prosekit-inline-popover-popup` custom element. */
declare const InlinePopoverPopup: ForwardRefExoticComponent<InlinePopoverPopupProps & HTMLAttributes<InlinePopoverPopupElement> & RefAttributes<InlinePopoverPopupElement>>;
/** Props for the {@link InlinePopoverPositioner} React component. */
interface InlinePopoverPositionerProps {
  /**
   * The initial placement of the floating element
   *
   * @default "top"
   */
  placement?: InlinePopoverPositionerProps$1['placement'];
  /**
   * The distance between the reference and floating element.
   *
   * @default 12
   */
  offset?: InlinePopoverPositionerProps$1['offset'];
  /**
   * Whether to hide the floating element when the reference element or the
   * floating element is fully clipped.
   *
   * @default true
   */
  hide?: InlinePopoverPositionerProps$1['hide'];
  /**
   * Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
   * to place the floating element on top of other page content.
   *
   * @default false
   */
  hoist?: InlinePopoverPositionerProps$1['hoist'];
  /**
   * Whether the floating element can overlap the reference element to keep it
   * in view.
   *
   * @default true
   */
  overlap?: InlinePopoverPositionerProps$1['overlap'];
  /**
   * Whether to improve positioning for inline reference elements that span over
   * multiple lines.
   *
   * @default true
   */
  inline?: InlinePopoverPositionerProps$1['inline'];
  /**
   * Describes the virtual padding around the boundary to check for overflow.
   *
   * @default 8
   */
  overflowPadding?: InlinePopoverPositionerProps$1['overflowPadding'];
  /**
   * The strategy to use for positioning
   *
   * @default "absolute"
   */
  strategy?: InlinePopoverPositionerProps$1['strategy'];
  /**
   * Options to activate auto-update listeners
   *
   * @see https://floating-ui.com/docs/autoUpdate
   *
   * @default true
   */
  autoUpdate?: InlinePopoverPositionerProps$1['autoUpdate'];
  /**
   * Whether to flip the `placement` in order to keep it in view when the
   * preferred placement(s) will overflow the clipping boundary. You can also
   * provide an array of placements to try sequentially if the preferred
   * `placement` does not fit.
   *
   * @default true
   */
  flip?: InlinePopoverPositionerProps$1['flip'];
  /**
   * Whether the floating element should shift to keep it in view.
   *
   * @default true
   */
  shift?: InlinePopoverPositionerProps$1['shift'];
  /**
   * Whether to constrain the floating element's width and height to not exceed
   * the viewport.
   *
   * @default false
   */
  fitViewport?: InlinePopoverPositionerProps$1['fitViewport'];
  /**
   * Whether to constrain the floating element's width so that it matches the
   * reference element.
   *
   * @default false
   */
  sameWidth?: InlinePopoverPositionerProps$1['sameWidth'];
  /**
   * Whether to constrain the floating element's height so that it matches the
   * reference element.
   *
   * @default false
   */
  sameHeight?: InlinePopoverPositionerProps$1['sameHeight'];
  /**
   * Describes the clipping element(s) or area that overflow will be checked relative to.
   * Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.
   *
   * @default 'clippingAncestors'
   */
  boundary?: InlinePopoverPositionerProps$1['boundary'];
  /**
   * Describes the root boundary that the element will be checked for overflow relative to.
   * Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.
   *
   * @default 'viewport'
   */
  rootBoundary?: InlinePopoverPositionerProps$1['rootBoundary'];
  /**
   * The element that will be used to check for overflow. Please see
   * https://floating-ui.com/docs/detectoverflow#elementcontext for more
   * information.
   *
   * @default 'floating'
   */
  elementContext?: InlinePopoverPositionerProps$1['elementContext'];
  /**
   * Whether to check the alternate elementContext's boundary. Please see
   * https://floating-ui.com/docs/detectoverflow#altboundary for more
   * information.
   *
   * @default false
   */
  altBoundary?: InlinePopoverPositionerProps$1['altBoundary'];
}
/** A React component that renders an `prosekit-inline-popover-positioner` custom element. */
declare const InlinePopoverPositioner: ForwardRefExoticComponent<InlinePopoverPositionerProps & HTMLAttributes<InlinePopoverPositionerElement> & RefAttributes<InlinePopoverPositionerElement>>;
/** Props for the {@link InlinePopoverRoot} React component. */
interface InlinePopoverRootProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor?: InlinePopoverRootProps$1['editor'];
  /**
   * Whether the popover is open by default when some inline content is
   * selected.
   *
   * @default true
   */
  defaultOpen?: InlinePopoverRootProps$1['defaultOpen'];
  /**
   * Whether the inline popover should be dismissed when the editor receives an
   * Escape key press.
   *
   * @default true
   */
  dismissOnEscape?: InlinePopoverRootProps$1['dismissOnEscape'];
  /**
   * The reference to position the popover against. This can be a DOM element, a
   * Floating UI virtual element, or a function that returns either of them.
   *
   * When set, the popover is anchored to this reference instead of the current
   * text selection, and the text selection no longer drives the open state, so
   * control it with the `open` property.
   *
   * @default null
   */
  anchor?: InlinePopoverRootProps$1['anchor'];
  /**
   * Whether the overlay is currently open.
   * @default null
   */
  open?: InlinePopoverRootProps$1['open'];
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: InlinePopoverRootProps$1['disabled'];
  /** Emitted when the open state of the popover changes. */
  onOpenChange?: (event: InlinePopoverRootEvents['openChange']) => void;
}
/** A React component that renders an `prosekit-inline-popover-root` custom element. */
declare const InlinePopoverRoot: ForwardRefExoticComponent<InlinePopoverRootProps & HTMLAttributes<InlinePopoverRootElement> & RefAttributes<InlinePopoverRootElement>>;
export { InlinePopoverPopup, type InlinePopoverPopupProps, InlinePopoverPositioner, type InlinePopoverPositionerProps, InlinePopoverRoot, type InlinePopoverRootProps };
//# sourceMappingURL=inline-popover.d.ts.map
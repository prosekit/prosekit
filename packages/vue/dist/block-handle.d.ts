import { DefineSetupFnComponent, HTMLAttributes } from "vue";
import { BlockHandleAddProps as BlockHandleAddProps$1, BlockHandleDraggableProps as BlockHandleDraggableProps$1, BlockHandlePositionerProps as BlockHandlePositionerProps$1, BlockHandleRootEvents, BlockHandleRootProps as BlockHandleRootProps$1 } from "@prosekit/web/block-handle";
/** Props for the {@link BlockHandleAdd} Vue component. */
interface BlockHandleAddProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor?: BlockHandleAddProps$1['editor'];
}
/** A Vue component that renders an `prosekit-block-handle-add` custom element. */
declare const BlockHandleAdd: DefineSetupFnComponent<BlockHandleAddProps & HTMLAttributes>;
/** Props for the {@link BlockHandleDraggable} Vue component. */
interface BlockHandleDraggableProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor?: BlockHandleDraggableProps$1['editor'];
}
/** A Vue component that renders an `prosekit-block-handle-draggable` custom element. */
declare const BlockHandleDraggable: DefineSetupFnComponent<BlockHandleDraggableProps & HTMLAttributes>;
/** Props for the {@link BlockHandlePopup} Vue component. */
interface BlockHandlePopupProps {}
/** A Vue component that renders an `prosekit-block-handle-popup` custom element. */
declare const BlockHandlePopup: DefineSetupFnComponent<BlockHandlePopupProps & HTMLAttributes>;
/** Props for the {@link BlockHandlePositioner} Vue component. */
interface BlockHandlePositionerProps {
  /**
   * The placement of the popover, relative to the hovered block.
   *
   * @default "left"
   */
  placement?: BlockHandlePositionerProps$1['placement'];
  /**
   * Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
   * to place the floating element on top of other page content.
   *
   * @default false
   */
  hoist?: BlockHandlePositionerProps$1['hoist'];
  /**
   * @default false
   * @hidden
   */
  flip?: BlockHandlePositionerProps$1['flip'];
  /**
   * @default false
   * @hidden
   */
  shift?: BlockHandlePositionerProps$1['shift'];
  /**
   * @default true
   * @hidden
   */
  hide?: BlockHandlePositionerProps$1['hide'];
  /**
   * The strategy to use for positioning
   *
   * @default "absolute"
   */
  strategy?: BlockHandlePositionerProps$1['strategy'];
  /**
   * Options to activate auto-update listeners
   *
   * @see https://floating-ui.com/docs/autoUpdate
   *
   * @default true
   */
  autoUpdate?: BlockHandlePositionerProps$1['autoUpdate'];
  /**
   * The distance between the reference and floating element.
   *
   * @default 6
   */
  offset?: BlockHandlePositionerProps$1['offset'];
  /**
   * Whether the floating element can overlap the reference element to keep it
   * in view.
   *
   * @default false
   */
  overlap?: BlockHandlePositionerProps$1['overlap'];
  /**
   * Whether to constrain the floating element's width and height to not exceed
   * the viewport.
   *
   * @default false
   */
  fitViewport?: BlockHandlePositionerProps$1['fitViewport'];
  /**
   * Whether to constrain the floating element's width so that it matches the
   * reference element.
   *
   * @default false
   */
  sameWidth?: BlockHandlePositionerProps$1['sameWidth'];
  /**
   * Whether to constrain the floating element's height so that it matches the
   * reference element.
   *
   * @default false
   */
  sameHeight?: BlockHandlePositionerProps$1['sameHeight'];
  /**
   * Whether to improve positioning for inline reference elements that span over
   * multiple lines.
   *
   * @default false
   */
  inline?: BlockHandlePositionerProps$1['inline'];
  /**
   * Describes the clipping element(s) or area that overflow will be checked relative to.
   * Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.
   *
   * @default 'clippingAncestors'
   */
  boundary?: BlockHandlePositionerProps$1['boundary'];
  /**
   * Describes the root boundary that the element will be checked for overflow relative to.
   * Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.
   *
   * @default 'viewport'
   */
  rootBoundary?: BlockHandlePositionerProps$1['rootBoundary'];
  /**
   * Describes the virtual padding around the boundary to check for overflow.
   * Please see https://floating-ui.com/docs/detectoverflow#padding for more information.
   *
   * @default 4
   */
  overflowPadding?: BlockHandlePositionerProps$1['overflowPadding'];
  /**
   * The element that will be used to check for overflow. Please see
   * https://floating-ui.com/docs/detectoverflow#elementcontext for more
   * information.
   *
   * @default 'floating'
   */
  elementContext?: BlockHandlePositionerProps$1['elementContext'];
  /**
   * Whether to check the alternate elementContext's boundary. Please see
   * https://floating-ui.com/docs/detectoverflow#altboundary for more
   * information.
   *
   * @default false
   */
  altBoundary?: BlockHandlePositionerProps$1['altBoundary'];
}
/** A Vue component that renders an `prosekit-block-handle-positioner` custom element. */
declare const BlockHandlePositioner: DefineSetupFnComponent<BlockHandlePositionerProps & HTMLAttributes>;
/** Props for the {@link BlockHandleRoot} Vue component. */
interface BlockHandleRootProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor?: BlockHandleRootProps$1['editor'];
  /** Fired when the hovered block changes. */
  onStateChange?: (event: BlockHandleRootEvents['stateChange']) => void;
}
/** A Vue component that renders an `prosekit-block-handle-root` custom element. */
declare const BlockHandleRoot: DefineSetupFnComponent<BlockHandleRootProps & HTMLAttributes>;
export { BlockHandleAdd, type BlockHandleAddProps, BlockHandleDraggable, type BlockHandleDraggableProps, BlockHandlePopup, type BlockHandlePopupProps, BlockHandlePositioner, type BlockHandlePositionerProps, BlockHandleRoot, type BlockHandleRootProps };
//# sourceMappingURL=block-handle.d.ts.map
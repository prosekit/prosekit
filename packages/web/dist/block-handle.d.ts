import { HostElement, HostElementConstructor, PropsDeclaration, State } from "@aria-ui/core";
import { OverlayPopupProps, OverlayPositionerProps } from "@aria-ui/elements/overlay";
import { Editor } from "@prosekit/core";
import { ProseMirrorNode } from "@prosekit/pm/model";
import { Placement } from "@floating-ui/dom";
interface BlockHandleAddProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null;
}
/** @internal */
export declare const BlockHandleAddPropsDeclaration: PropsDeclaration<BlockHandleAddProps>;
/**
 * @internal
 */
export declare function setupBlockHandleAdd(host: HostElement, props: State<BlockHandleAddProps>): void;
declare const BlockHandleAddElementBase: HostElementConstructor<BlockHandleAddProps>;
/**
 * `<prosekit-block-handle-add>` custom element.
 *
 * Properties: {@link BlockHandleAddProps}
 */
export declare class BlockHandleAddElement extends BlockHandleAddElementBase {}
/** @internal */
export declare function registerBlockHandleAddElement(): void;
interface BlockHandleDraggableProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null;
}
/** @internal */
export declare const BlockHandleDraggablePropsDeclaration: PropsDeclaration<BlockHandleDraggableProps>;
/**
 * @internal
 */
export declare function setupBlockHandleDraggable(host: HostElement, props: State<BlockHandleDraggableProps>): void;
declare const BlockHandleDraggableElementBase: HostElementConstructor<BlockHandleDraggableProps>;
/**
 * `<prosekit-block-handle-draggable>` custom element.
 *
 * Properties: {@link BlockHandleDraggableProps}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-dragging` | Present when the element is being dragged |
 */
export declare class BlockHandleDraggableElement extends BlockHandleDraggableElementBase {}
/** @internal */
export declare function registerBlockHandleDraggableElement(): void;
interface BlockHandlePopupProps extends OverlayPopupProps {}
/** @internal */
export declare const BlockHandlePopupPropsDeclaration: PropsDeclaration<BlockHandlePopupProps>;
/** @internal */
export declare function setupBlockHandlePopup(host: HostElement, _props: State<BlockHandlePopupProps>): void;
declare const BlockHandlePopupElementBase: HostElementConstructor<BlockHandlePopupProps>;
/**
 * `<prosekit-block-handle-popup>` custom element.
 *
 * Properties: {@link BlockHandlePopupProps}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-state` | `"open"` when the block handle is visible, `"closed"` otherwise |
 */
export declare class BlockHandlePopupElement extends BlockHandlePopupElementBase {}
/** @internal */
export declare function registerBlockHandlePopupElement(): void;
interface BlockHandlePositionerProps extends Omit<OverlayPositionerProps, 'placement' | 'hoist' | 'flip' | 'shift' | 'hide'> {
  /**
   * The placement of the popover, relative to the hovered block.
   *
   * @default "left"
   */
  placement: Placement;
  /**
   * Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
   * to place the floating element on top of other page content.
   *
   * @default false
   */
  hoist: boolean;
  /**
   * @default false
   * @hidden
   */
  flip: boolean;
  /**
   * @default false
   * @hidden
   */
  shift: boolean;
  /**
   * @default true
   * @hidden
   */
  hide: boolean;
}
/** @internal */
export declare const BlockHandlePositionerPropsDeclaration: PropsDeclaration<BlockHandlePositionerProps>;
/** @internal */
export declare function setupBlockHandlePositioner(host: HostElement, props: State<BlockHandlePositionerProps>): void;
declare const BlockHandlePositionerElementBase: HostElementConstructor<BlockHandlePositionerProps>;
/**
 * `<prosekit-block-handle-positioner>` custom element.
 *
 * Properties: {@link BlockHandlePositionerProps}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-state` | `"open"` when the block handle is visible, `"closed"` otherwise |
 * | `data-side` | The side of the anchor element the positioner is on |
 * | `data-align` | The alignment of the positioner relative to the anchor element |
 *
 * CSS variables:
 *
 * | Variable | Description |
 * | --- | --- |
 * | `--transform-origin` | The coordinates that this element is anchored to. Useful for scale animations. |
 */
export declare class BlockHandlePositionerElement extends BlockHandlePositionerElementBase {}
/** @internal */
export declare function registerBlockHandlePositionerElement(): void;
interface BlockHandleRootProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null;
}
/** @internal */
export declare const BlockHandleRootPropsDeclaration: PropsDeclaration<BlockHandleRootProps>;
export declare class BlockHandleStateChangeEvent extends Event {
  /**
   * The currently hovered block's node and position, or `null` if no block is hovered.
   */
  detail: {
    node: ProseMirrorNode;
    pos: number;
  } | null;
  constructor(state: {
    node: ProseMirrorNode;
    pos: number;
  } | null);
}
interface BlockHandleRootEvents {
  /**
   * Fired when the hovered block changes.
   */
  stateChange: BlockHandleStateChangeEvent;
}
/**
 * @internal
 */
export declare function setupBlockHandleRoot(host: HostElement, props: State<BlockHandleRootProps>): void;
declare const BlockHandleRootElementBase: HostElementConstructor<BlockHandleRootProps>;
/**
 * `<prosekit-block-handle-root>` custom element.
 *
 * Properties: {@link BlockHandleRootProps}
 *
 * Events: {@link BlockHandleRootEvents}
 */
export declare class BlockHandleRootElement extends BlockHandleRootElementBase {}
/** @internal */
export declare function registerBlockHandleRootElement(): void;
export type { BlockHandleAddProps, BlockHandleDraggableProps, BlockHandlePopupProps, BlockHandlePositionerProps, BlockHandleRootEvents, BlockHandleRootProps };
//# sourceMappingURL=block-handle.d.ts.map
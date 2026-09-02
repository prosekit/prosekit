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
declare const BlockHandleAddPropsDeclaration: PropsDeclaration<BlockHandleAddProps>;
/**
 * @internal
 */
declare function setupBlockHandleAdd(host: HostElement, props: State<BlockHandleAddProps>): void;
declare const BlockHandleAddElementBase: HostElementConstructor<BlockHandleAddProps>;
/**
 * `<prosekit-block-handle-add>` custom element.
 *
 * Properties: {@link BlockHandleAddProps}
 */
declare class BlockHandleAddElement extends BlockHandleAddElementBase {}
/** @internal */
declare function registerBlockHandleAddElement(): void;
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
declare const BlockHandleDraggablePropsDeclaration: PropsDeclaration<BlockHandleDraggableProps>;
/**
 * @internal
 */
declare function setupBlockHandleDraggable(host: HostElement, props: State<BlockHandleDraggableProps>): void;
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
declare class BlockHandleDraggableElement extends BlockHandleDraggableElementBase {}
/** @internal */
declare function registerBlockHandleDraggableElement(): void;
interface BlockHandlePopupProps extends OverlayPopupProps {}
/** @internal */
declare const BlockHandlePopupPropsDeclaration: PropsDeclaration<BlockHandlePopupProps>;
/** @internal */
declare function setupBlockHandlePopup(host: HostElement, _props: State<BlockHandlePopupProps>): void;
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
declare class BlockHandlePopupElement extends BlockHandlePopupElementBase {}
/** @internal */
declare function registerBlockHandlePopupElement(): void;
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
declare const BlockHandlePositionerPropsDeclaration: PropsDeclaration<BlockHandlePositionerProps>;
/** @internal */
declare function setupBlockHandlePositioner(host: HostElement, props: State<BlockHandlePositionerProps>): void;
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
declare class BlockHandlePositionerElement extends BlockHandlePositionerElementBase {}
/** @internal */
declare function registerBlockHandlePositionerElement(): void;
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
declare const BlockHandleRootPropsDeclaration: PropsDeclaration<BlockHandleRootProps>;
declare class BlockHandleStateChangeEvent extends Event {
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
declare function setupBlockHandleRoot(host: HostElement, props: State<BlockHandleRootProps>): void;
declare const BlockHandleRootElementBase: HostElementConstructor<BlockHandleRootProps>;
/**
 * `<prosekit-block-handle-root>` custom element.
 *
 * Properties: {@link BlockHandleRootProps}
 *
 * Events: {@link BlockHandleRootEvents}
 */
declare class BlockHandleRootElement extends BlockHandleRootElementBase {}
/** @internal */
declare function registerBlockHandleRootElement(): void;
export { BlockHandleAddElement, type BlockHandleAddProps, BlockHandleAddPropsDeclaration, BlockHandleDraggableElement, type BlockHandleDraggableProps, BlockHandleDraggablePropsDeclaration, BlockHandlePopupElement, type BlockHandlePopupProps, BlockHandlePopupPropsDeclaration, BlockHandlePositionerElement, type BlockHandlePositionerProps, BlockHandlePositionerPropsDeclaration, BlockHandleRootElement, type BlockHandleRootEvents, type BlockHandleRootProps, BlockHandleRootPropsDeclaration, BlockHandleStateChangeEvent, registerBlockHandleAddElement, registerBlockHandleDraggableElement, registerBlockHandlePopupElement, registerBlockHandlePositionerElement, registerBlockHandleRootElement, setupBlockHandleAdd, setupBlockHandleDraggable, setupBlockHandlePopup, setupBlockHandlePositioner, setupBlockHandleRoot };
//# sourceMappingURL=block-handle.d.ts.map
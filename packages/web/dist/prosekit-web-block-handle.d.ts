import { BaseElementConstructor, ConnectableElement, EventDeclarations, PropDeclarations, SetupOptions, SignalState } from "@aria-ui/core";
import { Editor } from "@prosekit/core";
import { OverlayPositionerEvents, OverlayPositionerProps } from "@aria-ui/overlay/elements";
import { ProseMirrorNode } from "@prosekit/pm/model";
import { Placement } from "@floating-ui/dom";

//#region src/components/block-handle/block-handle-add/types.d.ts
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
declare const blockHandleAddProps: PropDeclarations<BlockHandleAddProps>;
/** @internal */
interface BlockHandleAddEvents {}
/** @internal */
declare const blockHandleAddEvents: EventDeclarations<BlockHandleAddEvents>;
//#endregion
//#region src/components/block-handle/block-handle-add/element.gen.d.ts
declare const BlockHandleAddElementBase: BaseElementConstructor<BlockHandleAddProps>;
declare class BlockHandleAddElement extends BlockHandleAddElementBase {}
//#endregion
//#region src/components/block-handle/block-handle-add/setup.d.ts
/**
 * @internal
 */
declare function useBlockHandleAdd(host: ConnectableElement, {
  state
}: {
  state: SignalState<BlockHandleAddProps>;
}): void;
//#endregion
//#region src/components/block-handle/block-handle-draggable/types.d.ts
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
declare const blockHandleDraggableProps: PropDeclarations<BlockHandleDraggableProps>;
/** @internal */
interface BlockHandleDraggableEvents {}
/** @internal */
declare const blockHandleDraggableEvents: EventDeclarations<BlockHandleDraggableEvents>;
//#endregion
//#region src/components/block-handle/block-handle-draggable/element.gen.d.ts
declare const BlockHandleDraggableElementBase: BaseElementConstructor<BlockHandleDraggableProps>;
declare class BlockHandleDraggableElement extends BlockHandleDraggableElementBase {}
//#endregion
//#region src/components/block-handle/block-handle-draggable/setup.d.ts
/**
 * @internal
 */
declare function useBlockHandleDraggable(host: ConnectableElement, {
  state
}: {
  state: SignalState<BlockHandleDraggableProps>;
}): void;
//#endregion
//#region src/components/block-handle/block-handle-popover/types.d.ts
interface BlockHandlePopoverProps extends Omit<OverlayPositionerProps, 'placement' | 'hoist' | 'flip' | 'shift' | 'hide'> {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null;
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
declare const blockHandlePopoverProps: PropDeclarations<BlockHandlePopoverProps>;
interface BlockHandlePopoverEvents extends OverlayPositionerEvents {
  /**
   * Fired when the hovered block changes.
   */
  stateChange: CustomEvent<{
    node: ProseMirrorNode;
    pos: number;
  } | null>;
}
/** @internal */
declare const blockHandlePopoverEvents: EventDeclarations<BlockHandlePopoverEvents>;
//#endregion
//#region src/components/block-handle/block-handle-popover/element.gen.d.ts
declare const BlockHandlePopoverElementBase: BaseElementConstructor<BlockHandlePopoverProps>;
declare class BlockHandlePopoverElement extends BlockHandlePopoverElementBase {}
//#endregion
//#region src/components/block-handle/block-handle-popover/setup.d.ts
/**
 * @internal
 */
declare function useBlockHandlePopover(host: ConnectableElement, {
  state,
  emit
}: SetupOptions<BlockHandlePopoverProps, BlockHandlePopoverEvents>): void;
//#endregion
export { BlockHandleAddElement, type BlockHandleAddEvents, type BlockHandleAddProps, BlockHandleDraggableElement, type BlockHandleDraggableEvents, type BlockHandleDraggableProps, BlockHandlePopoverElement, type BlockHandlePopoverEvents, type BlockHandlePopoverProps, blockHandleAddEvents, blockHandleAddProps, blockHandleDraggableEvents, blockHandleDraggableProps, blockHandlePopoverEvents, blockHandlePopoverProps, useBlockHandleAdd, useBlockHandleDraggable, useBlockHandlePopover };
//# sourceMappingURL=prosekit-web-block-handle.d.ts.map
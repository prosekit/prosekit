import { BaseElementConstructor, EventDeclarations, PropDeclarations } from "@aria-ui/core";
import { Editor } from "@prosekit/core";
import { OverlayPositionerProps } from "@aria-ui/overlay/elements";
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
//#region src/components/block-handle/block-handle-popover/types.d.ts
interface BlockHandlePopoverProps extends Omit<OverlayPositionerProps, "placement" | "hoist"> {
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
}
/** @internal */
declare const blockHandlePopoverProps: PropDeclarations<BlockHandlePopoverProps>;
/** @internal */
interface BlockHandlePopoverEvents {}
/** @internal */
declare const blockHandlePopoverEvents: EventDeclarations<BlockHandlePopoverEvents>;

//#endregion
//#region src/components/block-handle/block-handle-popover/element.gen.d.ts
declare const BlockHandlePopoverElementBase: BaseElementConstructor<BlockHandlePopoverProps>;
declare class BlockHandlePopoverElement extends BlockHandlePopoverElementBase {}

//#endregion
export { BlockHandleAddElement, BlockHandleAddEvents, BlockHandleAddProps, BlockHandleDraggableElement, BlockHandleDraggableEvents, BlockHandleDraggableProps, BlockHandlePopoverElement, BlockHandlePopoverEvents, BlockHandlePopoverProps, blockHandleAddEvents, blockHandleAddProps, blockHandleDraggableEvents, blockHandleDraggableProps, blockHandlePopoverEvents, blockHandlePopoverProps };
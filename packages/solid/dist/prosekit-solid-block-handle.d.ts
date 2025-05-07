import { PropsWithElement } from "./types-CC9kxezm.js";
import { CreateProps } from "./create-props-YzgBVL0x.js";
import { Component } from "solid-js";
import { BlockHandleAddElement, BlockHandleAddEvents, BlockHandleAddProps as BlockHandleAddProps$1, BlockHandleDraggableElement, BlockHandleDraggableEvents, BlockHandleDraggableProps as BlockHandleDraggableProps$1, BlockHandlePopoverElement, BlockHandlePopoverEvents, BlockHandlePopoverProps as BlockHandlePopoverProps$1 } from "@prosekit/web/block-handle";

//#region src/components/block-handle/block-handle-add.gen.d.ts
/**
* Props for the {@link BlockHandleAdd} component.
*/
/**
* Props for the {@link BlockHandleAdd} component.
*/
interface BlockHandleAddProps extends Partial<CreateProps<BlockHandleAddProps$1, BlockHandleAddEvents>> {}
declare const BlockHandleAdd: Component<PropsWithElement<BlockHandleAddProps, BlockHandleAddElement>>;

//#endregion
//#region src/components/block-handle/block-handle-draggable.gen.d.ts
/**
* Props for the {@link BlockHandleDraggable} component.
*/
interface BlockHandleDraggableProps extends Partial<CreateProps<BlockHandleDraggableProps$1, BlockHandleDraggableEvents>> {}
declare const BlockHandleDraggable: Component<PropsWithElement<BlockHandleDraggableProps, BlockHandleDraggableElement>>;

//#endregion
//#region src/components/block-handle/block-handle-popover.gen.d.ts
/**
* Props for the {@link BlockHandlePopover} component.
*/
interface BlockHandlePopoverProps extends Partial<CreateProps<BlockHandlePopoverProps$1, BlockHandlePopoverEvents>> {}
declare const BlockHandlePopover: Component<PropsWithElement<BlockHandlePopoverProps, BlockHandlePopoverElement>>;

//#endregion
export { BlockHandleAdd, BlockHandleAddProps, BlockHandleDraggable, BlockHandleDraggableProps, BlockHandlePopover, BlockHandlePopoverProps };
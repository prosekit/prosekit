import { CreateEmits } from "./create-emits-fip0zdCA.js";
import { DefineSetupFnComponent, HTMLAttributes } from "vue";
import { BlockHandleAddEvents, BlockHandleAddProps as BlockHandleAddProps$1, BlockHandleDraggableEvents, BlockHandleDraggableProps as BlockHandleDraggableProps$1, BlockHandlePopoverEvents, BlockHandlePopoverProps as BlockHandlePopoverProps$1 } from "@prosekit/web/block-handle";

//#region src/components/block-handle/block-handle-add.gen.d.ts
/**
* Props for the {@link BlockHandleAdd} component.
*/
/**
* Props for the {@link BlockHandleAdd} component.
*/
interface BlockHandleAddProps extends Partial<BlockHandleAddProps$1> {}
/**
* Emits for the {@link BlockHandleAdd} component.
*/
interface BlockHandleAddEmits extends CreateEmits<BlockHandleAddEvents> {}
declare const BlockHandleAdd: DefineSetupFnComponent<BlockHandleAddProps & HTMLAttributes, BlockHandleAddEmits>;

//#endregion
//#region src/components/block-handle/block-handle-draggable.gen.d.ts
/**
* Props for the {@link BlockHandleDraggable} component.
*/
interface BlockHandleDraggableProps extends Partial<BlockHandleDraggableProps$1> {}
/**
* Emits for the {@link BlockHandleDraggable} component.
*/
interface BlockHandleDraggableEmits extends CreateEmits<BlockHandleDraggableEvents> {}
declare const BlockHandleDraggable: DefineSetupFnComponent<BlockHandleDraggableProps & HTMLAttributes, BlockHandleDraggableEmits>;

//#endregion
//#region src/components/block-handle/block-handle-popover.gen.d.ts
/**
* Props for the {@link BlockHandlePopover} component.
*/
interface BlockHandlePopoverProps extends Partial<BlockHandlePopoverProps$1> {}
/**
* Emits for the {@link BlockHandlePopover} component.
*/
interface BlockHandlePopoverEmits extends CreateEmits<BlockHandlePopoverEvents> {}
declare const BlockHandlePopover: DefineSetupFnComponent<BlockHandlePopoverProps & HTMLAttributes, BlockHandlePopoverEmits>;

//#endregion
export { BlockHandleAdd, BlockHandleAddEmits, BlockHandleAddProps, BlockHandleDraggable, BlockHandleDraggableEmits, BlockHandleDraggableProps, BlockHandlePopover, BlockHandlePopoverEmits, BlockHandlePopoverProps };
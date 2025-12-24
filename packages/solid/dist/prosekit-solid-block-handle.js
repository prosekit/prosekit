import { t as createComponent } from "./create-component-DOv1yHjo.js";
import { blockHandleAddEvents, blockHandleAddProps, blockHandleDraggableEvents, blockHandleDraggableProps, blockHandlePopoverEvents, blockHandlePopoverProps } from "@prosekit/web/block-handle";

//#region src/components/block-handle/block-handle-add.gen.ts
const BlockHandleAdd = createComponent("prosekit-block-handle-add", Object.keys(blockHandleAddProps), Object.keys(blockHandleAddEvents));

//#endregion
//#region src/components/block-handle/block-handle-draggable.gen.ts
const BlockHandleDraggable = createComponent("prosekit-block-handle-draggable", Object.keys(blockHandleDraggableProps), Object.keys(blockHandleDraggableEvents));

//#endregion
//#region src/components/block-handle/block-handle-popover.gen.ts
const BlockHandlePopover = createComponent("prosekit-block-handle-popover", Object.keys(blockHandlePopoverProps), Object.keys(blockHandlePopoverEvents));

//#endregion
export { BlockHandleAdd, BlockHandleDraggable, BlockHandlePopover };
//# sourceMappingURL=prosekit-solid-block-handle.js.map
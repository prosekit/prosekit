import { CreateEmits } from "./create-emits.d-BVj2S3yh.js";
import { DefineSetupFnComponent, HTMLAttributes } from "vue";
import { ResizableHandleEvents, ResizableHandleProps as ResizableHandleProps$1, ResizableRootEvents, ResizableRootProps as ResizableRootProps$1 } from "@prosekit/web/resizable";

//#region src/components/resizable/resizable-handle.gen.d.ts
/**
* Props for the {@link ResizableHandle} component.
*/
/**
* Props for the {@link ResizableHandle} component.
*/
interface ResizableHandleProps extends Partial<ResizableHandleProps$1> {}
/**
* Emits for the {@link ResizableHandle} component.
*/
interface ResizableHandleEmits extends CreateEmits<ResizableHandleEvents> {}
declare const ResizableHandle: DefineSetupFnComponent<ResizableHandleProps & HTMLAttributes, ResizableHandleEmits>;

//#endregion
//#region src/components/resizable/resizable-root.gen.d.ts
/**
* Props for the {@link ResizableRoot} component.
*/
interface ResizableRootProps extends Partial<ResizableRootProps$1> {}
/**
* Emits for the {@link ResizableRoot} component.
*/
interface ResizableRootEmits extends CreateEmits<ResizableRootEvents> {}
declare const ResizableRoot: DefineSetupFnComponent<ResizableRootProps & HTMLAttributes, ResizableRootEmits>;

//#endregion
export { ResizableHandle, ResizableHandleEmits, ResizableHandleProps, ResizableRoot, ResizableRootEmits, ResizableRootProps };
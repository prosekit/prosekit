import { CreateProps } from "./create-props.d-C_YR_C7I.js";
import { ForwardRefExoticComponent, HTMLAttributes, RefAttributes } from "preact/compat";
import { ResizableHandleElement, ResizableHandleEvents, ResizableHandleProps as ResizableHandleProps$1, ResizableRootElement, ResizableRootEvents, ResizableRootProps as ResizableRootProps$1 } from "@prosekit/web/resizable";

//#region src/components/resizable/resizable-handle.gen.d.ts
/**
* Props for the {@link ResizableHandle} component.
*/
/**
* Props for the {@link ResizableHandle} component.
*/
interface ResizableHandleProps extends Partial<CreateProps<ResizableHandleProps$1, ResizableHandleEvents>> {}
declare const ResizableHandle: ForwardRefExoticComponent<Partial<ResizableHandleProps> & RefAttributes<ResizableHandleElement> & HTMLAttributes<ResizableHandleElement>>;

//#endregion
//#region src/components/resizable/resizable-root.gen.d.ts
/**
* Props for the {@link ResizableRoot} component.
*/
interface ResizableRootProps extends Partial<CreateProps<ResizableRootProps$1, ResizableRootEvents>> {}
declare const ResizableRoot: ForwardRefExoticComponent<Partial<ResizableRootProps> & RefAttributes<ResizableRootElement> & HTMLAttributes<ResizableRootElement>>;

//#endregion
export { ResizableHandle, ResizableHandleProps, ResizableRoot, ResizableRootProps };
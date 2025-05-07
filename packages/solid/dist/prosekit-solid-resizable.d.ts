import { PropsWithElement } from "./types.d-BCb-LSbS.js";
import { CreateProps } from "./create-props.d-Cg5AzcmF.js";
import { Component } from "solid-js";
import { ResizableHandleElement, ResizableHandleEvents, ResizableHandleProps as ResizableHandleProps$1, ResizableRootElement, ResizableRootEvents, ResizableRootProps as ResizableRootProps$1 } from "@prosekit/web/resizable";

//#region src/components/resizable/resizable-handle.gen.d.ts
/**
* Props for the {@link ResizableHandle} component.
*/
/**
* Props for the {@link ResizableHandle} component.
*/
interface ResizableHandleProps extends Partial<CreateProps<ResizableHandleProps$1, ResizableHandleEvents>> {}
declare const ResizableHandle: Component<PropsWithElement<ResizableHandleProps, ResizableHandleElement>>;

//#endregion
//#region src/components/resizable/resizable-root.gen.d.ts
/**
* Props for the {@link ResizableRoot} component.
*/
interface ResizableRootProps extends Partial<CreateProps<ResizableRootProps$1, ResizableRootEvents>> {}
declare const ResizableRoot: Component<PropsWithElement<ResizableRootProps, ResizableRootElement>>;

//#endregion
export { ResizableHandle, ResizableHandleProps, ResizableRoot, ResizableRootProps };
import { BaseElementConstructor, EventDeclarations, PropDeclarations } from "@aria-ui/core";

//#region src/components/resizable/resizable-handle/types.d.ts
interface ResizableHandleProps {
  /**
  * The position of the handle.
  *
  * @default "bottom-right"
  */
  position: "top" | "right" | "bottom" | "left" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
}
/** @internal */
declare const resizableHandleProps: PropDeclarations<ResizableHandleProps>;
/** @internal */
interface ResizableHandleEvents {}
/** @internal */
declare const resizableHandleEvents: EventDeclarations<ResizableHandleEvents>;

//#endregion
//#region src/components/resizable/resizable-handle/element.gen.d.ts
declare const ResizableHandleElementBase: BaseElementConstructor<ResizableHandleProps>;
declare class ResizableHandleElement extends ResizableHandleElementBase {}

//#endregion
//#region src/components/resizable/resizable-root/types.d.ts
interface ResizableRootProps {
  width: number | null;
  height: number | null;
  aspectRatio: number | null;
}
/** @internal */
declare const resizableRootProps: PropDeclarations<ResizableRootProps>;
interface ResizableRootEvents {
  resizeStart: CustomEvent<{
    width: number;
    height: number;
  }>;
  resizeEnd: CustomEvent<{
    width: number;
    height: number;
  }>;
}
/** @internal */
declare const resizableRootEvents: EventDeclarations<ResizableRootEvents>;

//#endregion
//#region src/components/resizable/resizable-root/element.gen.d.ts
declare const ResizableRootElementBase: BaseElementConstructor<ResizableRootProps>;
declare class ResizableRootElement extends ResizableRootElementBase {}

//#endregion
export { ResizableHandleElement, ResizableHandleEvents, ResizableHandleProps, ResizableRootElement, ResizableRootEvents, ResizableRootProps, resizableHandleEvents, resizableHandleProps, resizableRootEvents, resizableRootProps };
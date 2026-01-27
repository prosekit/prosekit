import { BaseElementConstructor, ConnectableElement, EventDeclarations, PropDeclarations, SetupOptions, SignalState } from "@aria-ui/core";

//#region src/components/resizable/resizable-handle/types.d.ts
interface ResizableHandleProps {
  /**
   * The position of the handle.
   *
   * @default "bottom-right"
   */
  position: 'top' | 'right' | 'bottom' | 'left' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
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
//#region src/components/resizable/resizable-handle/setup.d.ts
/**
 * @internal
 */
declare function useResizableHandle(host: ConnectableElement, {
  state
}: {
  state: SignalState<ResizableHandleProps>;
}): void;
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
//#region src/components/resizable/resizable-root/setup.d.ts
/**
 * @internal
 */
declare function useResizableRoot(host: ConnectableElement, {
  state,
  emit
}: SetupOptions<ResizableRootProps, ResizableRootEvents>): void;
//#endregion
export { ResizableHandleElement, type ResizableHandleEvents, type ResizableHandleProps, ResizableRootElement, type ResizableRootEvents, type ResizableRootProps, resizableHandleEvents, resizableHandleProps, resizableRootEvents, resizableRootProps, useResizableHandle, useResizableRoot };
//# sourceMappingURL=prosekit-web-resizable.d.ts.map
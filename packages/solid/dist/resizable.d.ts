import { Component, JSX } from "solid-js";
import { ResizableHandleElement, ResizableHandleProps as ResizableHandleProps$1, ResizableRootElement, ResizableRootEvents, ResizableRootProps as ResizableRootProps$1 } from "@prosekit/web/resizable";
/** Props for the {@link ResizableRoot} Solid component. */
interface ResizableRootProps {
  /**
   * The width of the resizable element.
   *
   * @default null
   */
  width?: ResizableRootProps$1['width'];
  /**
   * The height of the resizable element.
   *
   * @default null
   */
  height?: ResizableRootProps$1['height'];
  /**
   * The aspect ratio of the resizable element.
   *
   * @default null
   */
  aspectRatio?: ResizableRootProps$1['aspectRatio'];
  /** Emitted when a resize operation starts. */
  onResizeStart?: (event: ResizableRootEvents['resizeStart']) => void;
  /** Emitted when a resize operation ends. */
  onResizeEnd?: (event: ResizableRootEvents['resizeEnd']) => void;
}
/** A Solid component that renders an `prosekit-resizable-root` custom element. */
declare const ResizableRoot: Component<ResizableRootProps & JSX.HTMLAttributes<ResizableRootElement>>;
/** Props for the {@link ResizableHandle} Solid component. */
interface ResizableHandleProps {
  /**
   * The position of the handle.
   *
   * @default "bottom-right"
   */
  position?: ResizableHandleProps$1['position'];
}
/** A Solid component that renders an `prosekit-resizable-handle` custom element. */
declare const ResizableHandle: Component<ResizableHandleProps & JSX.HTMLAttributes<ResizableHandleElement>>;
export { ResizableHandle, type ResizableHandleProps, ResizableRoot, type ResizableRootProps };
//# sourceMappingURL=resizable.d.ts.map
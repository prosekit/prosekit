import { HTMLAttributes } from "preact";
import { ForwardRefExoticComponent, RefAttributes } from "preact/compat";
import { ResizableHandleElement, ResizableHandleProps as ResizableHandleProps$1, ResizableRootElement, ResizableRootEvents, ResizableRootProps as ResizableRootProps$1 } from "@prosekit/web/resizable";
/** Props for the {@link ResizableRoot} Preact component. */
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
/** A Preact component that renders an `prosekit-resizable-root` custom element. */
declare const ResizableRoot: ForwardRefExoticComponent<ResizableRootProps & HTMLAttributes<ResizableRootElement> & RefAttributes<ResizableRootElement>>;
/** Props for the {@link ResizableHandle} Preact component. */
interface ResizableHandleProps {
  /**
   * The position of the handle.
   *
   * @default "bottom-right"
   */
  position?: ResizableHandleProps$1['position'];
}
/** A Preact component that renders an `prosekit-resizable-handle` custom element. */
declare const ResizableHandle: ForwardRefExoticComponent<ResizableHandleProps & HTMLAttributes<ResizableHandleElement> & RefAttributes<ResizableHandleElement>>;
export { ResizableHandle, type ResizableHandleProps, ResizableRoot, type ResizableRootProps };
//# sourceMappingURL=resizable.d.ts.map
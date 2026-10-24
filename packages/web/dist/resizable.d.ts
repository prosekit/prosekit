import { HostElement, HostElementConstructor, PropsDeclaration, State } from "@aria-ui/core";
interface ResizableRootProps {
  /**
   * The width of the resizable element.
   *
   * @default null
   */
  width: number | null;
  /**
   * The height of the resizable element.
   *
   * @default null
   */
  height: number | null;
  /**
   * The aspect ratio of the resizable element.
   *
   * @default null
   */
  aspectRatio: number | null;
}
/**
 * @internal
 */
export declare const ResizableRootPropsDeclaration: PropsDeclaration<ResizableRootProps>;
interface ResizableRootEvents {
  /**
   * Emitted when a resize operation starts.
   */
  resizeStart: ResizeStartEvent;
  /**
   * Emitted when a resize operation ends.
   */
  resizeEnd: ResizeEndEvent;
}
export declare class ResizeStartEvent extends Event {
  readonly detail: {
    readonly width: number;
    readonly height: number;
  };
  constructor(width: number, height: number);
}
export declare class ResizeEndEvent extends Event {
  readonly detail: {
    readonly width: number;
    readonly height: number;
  };
  constructor(width: number, height: number);
}
/**
 * @internal
 */
export declare function setupResizableRoot(host: HostElement, props: State<ResizableRootProps>): void;
declare const ResizableRootElementBase: HostElementConstructor<ResizableRootProps>;
/**
 * `<prosekit-resizable-root>` custom element.
 *
 * Properties: {@link ResizableRootProps}
 *
 * Events: {@link ResizableRootEvents}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-resizing` | Present when the element is being resized |
 */
export declare class ResizableRootElement extends ResizableRootElementBase {}
/**
 * @internal
 */
export declare function registerResizableRootElement(): void;
interface ResizableHandleProps {
  /**
   * The position of the handle.
   *
   * @default "bottom-right"
   */
  position: 'top' | 'right' | 'bottom' | 'left' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}
/**
 * @internal
 */
export declare const ResizableHandlePropsDeclaration: PropsDeclaration<ResizableHandleProps>;
/**
 * @internal
 */
export declare function setupResizableHandle(host: HostElement, props: State<ResizableHandleProps>): void;
declare const ResizableHandleElementBase: HostElementConstructor<ResizableHandleProps>;
/**
 * `<prosekit-resizable-handle>` custom element.
 *
 * Properties: {@link ResizableHandleProps}
 */
export declare class ResizableHandleElement extends ResizableHandleElementBase {}
/**
 * @internal
 */
export declare function registerResizableHandleElement(): void;
export type { ResizableHandleProps, ResizableRootEvents, ResizableRootProps };
//# sourceMappingURL=resizable.d.ts.map
import type { ResizableRootElement, ResizableRootEvents, ResizableRootProps as ResizableRootElementProps } from '@prosekit/web/resizable';
import type { Component, Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
/** Props for the {@link ResizableRoot} Svelte component. */
export interface ResizableRootProps {
    /**
     * The width of the resizable element.
     *
     * @default null
     */
    width?: ResizableRootElementProps['width'];
    /**
     * The height of the resizable element.
     *
     * @default null
     */
    height?: ResizableRootElementProps['height'];
    /**
     * The aspect ratio of the resizable element.
     *
     * @default null
     */
    aspectRatio?: ResizableRootElementProps['aspectRatio'];
    /** Emitted when a resize operation starts. */
    onResizeStart?: (event: ResizableRootEvents['resizeStart']) => void;
    /** Emitted when a resize operation ends. */
    onResizeEnd?: (event: ResizableRootEvents['resizeEnd']) => void;
    children?: Snippet;
}
/** A Svelte component that renders an `prosekit-resizable-root` custom element. */
export declare const ResizableRoot: Component<ResizableRootProps & HTMLAttributes<ResizableRootElement>>;
//# sourceMappingURL=resizable-root.gen.d.ts.map
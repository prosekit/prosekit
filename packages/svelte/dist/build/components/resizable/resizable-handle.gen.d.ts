import type { ResizableHandleElement, ResizableHandleProps as ResizableHandleElementProps } from '@prosekit/web/resizable';
import type { Component, Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
/** Props for the {@link ResizableHandle} Svelte component. */
export interface ResizableHandleProps {
    /**
     * The position of the handle.
     *
     * @default "bottom-right"
     */
    position?: ResizableHandleElementProps['position'];
    children?: Snippet;
}
/** A Svelte component that renders an `prosekit-resizable-handle` custom element. */
export declare const ResizableHandle: Component<ResizableHandleProps & HTMLAttributes<ResizableHandleElement>>;
//# sourceMappingURL=resizable-handle.gen.d.ts.map
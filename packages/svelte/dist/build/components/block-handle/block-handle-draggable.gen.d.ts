import type { BlockHandleDraggableElement, BlockHandleDraggableProps as BlockHandleDraggableElementProps } from '@prosekit/web/block-handle';
import type { Component, Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
/** Props for the {@link BlockHandleDraggable} Svelte component. */
export interface BlockHandleDraggableProps {
    /**
     * The ProseKit editor instance.
     *
     * @default null
     * @hidden
     */
    editor?: BlockHandleDraggableElementProps['editor'];
    children?: Snippet;
}
/** A Svelte component that renders an `prosekit-block-handle-draggable` custom element. */
export declare const BlockHandleDraggable: Component<BlockHandleDraggableProps & HTMLAttributes<BlockHandleDraggableElement>>;
//# sourceMappingURL=block-handle-draggable.gen.d.ts.map
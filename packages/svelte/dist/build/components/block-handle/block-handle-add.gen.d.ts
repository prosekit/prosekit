import type { BlockHandleAddElement, BlockHandleAddProps as BlockHandleAddElementProps } from '@prosekit/web/block-handle';
import type { Component, Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
/** Props for the {@link BlockHandleAdd} Svelte component. */
export interface BlockHandleAddProps {
    /**
     * The ProseKit editor instance.
     *
     * @default null
     * @hidden
     */
    editor?: BlockHandleAddElementProps['editor'];
    children?: Snippet;
}
/** A Svelte component that renders an `prosekit-block-handle-add` custom element. */
export declare const BlockHandleAdd: Component<BlockHandleAddProps & HTMLAttributes<BlockHandleAddElement>>;
//# sourceMappingURL=block-handle-add.gen.d.ts.map
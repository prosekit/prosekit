import type { BlockHandleRootElement, BlockHandleRootEvents, BlockHandleRootProps as BlockHandleRootElementProps } from '@prosekit/web/block-handle';
import type { Component, Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
/** Props for the {@link BlockHandleRoot} Svelte component. */
export interface BlockHandleRootProps {
    /**
     * The ProseKit editor instance.
     *
     * @default null
     * @hidden
     */
    editor?: BlockHandleRootElementProps['editor'];
    /** Fired when the hovered block changes. */
    onStateChange?: (event: BlockHandleRootEvents['stateChange']) => void;
    children?: Snippet;
}
/** A Svelte component that renders an `prosekit-block-handle-root` custom element. */
export declare const BlockHandleRoot: Component<BlockHandleRootProps & HTMLAttributes<BlockHandleRootElement>>;
//# sourceMappingURL=block-handle-root.gen.d.ts.map
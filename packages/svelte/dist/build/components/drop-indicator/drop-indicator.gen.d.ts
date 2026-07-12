import type { DropIndicatorElement, DropIndicatorProps as DropIndicatorElementProps } from '@prosekit/web/drop-indicator';
import type { Component, Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
/** Props for the {@link DropIndicator} Svelte component. */
export interface DropIndicatorProps {
    /**
     * The ProseKit editor instance.
     *
     * @default null
     * @hidden
     */
    editor?: DropIndicatorElementProps['editor'];
    /**
     * The line width in pixels.
     *
     * @default 2
     */
    width?: DropIndicatorElementProps['width'];
    children?: Snippet;
}
/** A Svelte component that renders an `prosekit-drop-indicator` custom element. */
export declare const DropIndicator: Component<DropIndicatorProps & HTMLAttributes<DropIndicatorElement>>;
//# sourceMappingURL=drop-indicator.gen.d.ts.map
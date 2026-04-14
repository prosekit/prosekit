import type { InlinePopoverRootElement, InlinePopoverRootEvents, InlinePopoverRootProps as InlinePopoverRootElementProps } from '@prosekit/web/inline-popover';
import type { Component, Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
/** Props for the {@link InlinePopoverRoot} Svelte component. */
export interface InlinePopoverRootProps {
    /**
     * The ProseKit editor instance.
     *
     * @default null
     * @hidden
     */
    editor?: InlinePopoverRootElementProps['editor'];
    /**
     * Whether the popover is open by default when some inline content is
     * selected.
     *
     * @default true
     */
    defaultOpen?: InlinePopoverRootElementProps['defaultOpen'];
    /**
     * Whether the inline popover should be dismissed when the editor receives an
     * Escape key press.
     *
     * @default true
     */
    dismissOnEscape?: InlinePopoverRootElementProps['dismissOnEscape'];
    /**
     * Whether the overlay is currently open.
     * @default null
     */
    open?: InlinePopoverRootElementProps['open'];
    /**
     * Whether the component should ignore user interaction.
     * @default false
     */
    disabled?: InlinePopoverRootElementProps['disabled'];
    /** Emitted when the open state of the popover changes. */
    onOpenChange?: (event: InlinePopoverRootEvents['openChange']) => void;
    children?: Snippet;
}
/** A Svelte component that renders an `prosekit-inline-popover-root` custom element. */
export declare const InlinePopoverRoot: Component<InlinePopoverRootProps & HTMLAttributes<InlinePopoverRootElement>>;
//# sourceMappingURL=inline-popover-root.gen.d.ts.map
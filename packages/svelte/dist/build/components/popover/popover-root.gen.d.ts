import type { PopoverRootElement, PopoverRootEvents, PopoverRootProps as PopoverRootElementProps } from '@prosekit/web/popover';
import type { Component, Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
/** Props for the {@link PopoverRoot} Svelte component. */
export interface PopoverRootProps {
    /**
     * Whether the popover should be modal.
     * When true, the popover will trap focus and prevent interaction with the rest of the page.
     *
     * @default false
     */
    modal?: PopoverRootElementProps['modal'];
    /**
     * Whether the overlay is initially open.
     * @default false
     */
    defaultOpen?: PopoverRootElementProps['defaultOpen'];
    /**
     * Whether the overlay is currently open.
     * @default null
     */
    open?: PopoverRootElementProps['open'];
    /**
     * Whether the component should ignore user interaction.
     * @default false
     */
    disabled?: PopoverRootElementProps['disabled'];
    /** Emitted when the popover is opened or closed. */
    onOpenChange?: (event: PopoverRootEvents['openChange']) => void;
    children?: Snippet;
}
/** A Svelte component that renders an `prosekit-popover-root` custom element. */
export declare const PopoverRoot: Component<PopoverRootProps & HTMLAttributes<PopoverRootElement>>;
//# sourceMappingURL=popover-root.gen.d.ts.map
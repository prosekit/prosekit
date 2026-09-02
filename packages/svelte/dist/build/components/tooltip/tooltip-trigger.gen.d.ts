import type { TooltipTriggerElement, TooltipTriggerProps as TooltipTriggerElementProps } from '@prosekit/web/tooltip';
import type { Component, Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
/** Props for the {@link TooltipTrigger} Svelte component. */
export interface TooltipTriggerProps {
    /**
     * Whether the component should ignore user interaction.
     * @default false
     */
    disabled?: TooltipTriggerElementProps['disabled'];
    /**
     * The delay in milliseconds before opening the tooltip on hover.
     * @default 600
     */
    openDelay?: TooltipTriggerElementProps['openDelay'];
    /**
     * The delay in milliseconds before closing the tooltip when hover/focus ends.
     * @default 0
     */
    closeDelay?: TooltipTriggerElementProps['closeDelay'];
    children?: Snippet;
}
/** A Svelte component that renders an `prosekit-tooltip-trigger` custom element. */
export declare const TooltipTrigger: Component<TooltipTriggerProps & HTMLAttributes<TooltipTriggerElement>>;
//# sourceMappingURL=tooltip-trigger.gen.d.ts.map
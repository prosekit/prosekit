import type { PopoverContentElement, PopoverContentProps as Props, PopoverContentEvents as Events } from '@prosekit/web/popover';
import type { SvelteComponent } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { CreateProps } from '../create-props';
/**
 * Props for the {@link PopoverContent} component.
 */
export interface PopoverContentProps extends Partial<CreateProps<Props, Events>> {
}
export declare const PopoverContent: typeof SvelteComponent<PopoverContentProps & HTMLAttributes<PopoverContentElement>>;

import type { PopoverTriggerElement, PopoverTriggerProps as Props, PopoverTriggerEvents as Events } from '@prosekit/web/popover';
import type { SvelteComponent } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { CreateProps } from '../create-props.ts';
/**
 * Props for the {@link PopoverTrigger} component.
 */
export interface PopoverTriggerProps extends Partial<CreateProps<Props, Events>> {
}
export declare const PopoverTrigger: typeof SvelteComponent<PopoverTriggerProps & HTMLAttributes<PopoverTriggerElement>>;
//# sourceMappingURL=popover-trigger.gen.d.ts.map
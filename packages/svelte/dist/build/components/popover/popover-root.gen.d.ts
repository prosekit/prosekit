import type { PopoverRootElement, PopoverRootProps as Props, PopoverRootEvents as Events } from '@prosekit/web/popover';
import type { SvelteComponent } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { CreateProps } from '../create-props.ts';
/**
 * Props for the {@link PopoverRoot} component.
 */
export interface PopoverRootProps extends Partial<CreateProps<Props, Events>> {
}
export declare const PopoverRoot: typeof SvelteComponent<PopoverRootProps & HTMLAttributes<PopoverRootElement>>;
//# sourceMappingURL=popover-root.gen.d.ts.map
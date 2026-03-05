import type { TooltipRootElement, TooltipRootProps as Props, TooltipRootEvents as Events } from '@prosekit/web/tooltip';
import type { SvelteComponent } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { CreateProps } from '../create-props.ts';
/**
 * Props for the {@link TooltipRoot} component.
 */
export interface TooltipRootProps extends Partial<CreateProps<Props, Events>> {
}
export declare const TooltipRoot: typeof SvelteComponent<TooltipRootProps & HTMLAttributes<TooltipRootElement>>;
//# sourceMappingURL=tooltip-root.gen.d.ts.map
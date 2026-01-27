import type { TooltipContentElement, TooltipContentProps as Props, TooltipContentEvents as Events } from '@prosekit/web/tooltip';
import type { SvelteComponent } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { CreateProps } from '../create-props';
/**
 * Props for the {@link TooltipContent} component.
 */
export interface TooltipContentProps extends Partial<CreateProps<Props, Events>> {
}
export declare const TooltipContent: typeof SvelteComponent<TooltipContentProps & HTMLAttributes<TooltipContentElement>>;
//# sourceMappingURL=tooltip-content.gen.d.ts.map
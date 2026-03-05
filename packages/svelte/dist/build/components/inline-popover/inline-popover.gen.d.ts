import type { InlinePopoverElement, InlinePopoverProps as Props, InlinePopoverEvents as Events } from '@prosekit/web/inline-popover';
import type { SvelteComponent } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { CreateProps } from '../create-props.ts';
/**
 * Props for the {@link InlinePopover} component.
 */
export interface InlinePopoverProps extends Partial<CreateProps<Props, Events>> {
}
export declare const InlinePopover: typeof SvelteComponent<InlinePopoverProps & HTMLAttributes<InlinePopoverElement>>;
//# sourceMappingURL=inline-popover.gen.d.ts.map
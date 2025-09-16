import type { AutocompletePopoverElement, AutocompletePopoverProps as Props, AutocompletePopoverEvents as Events } from '@prosekit/web/autocomplete';
import type { SvelteComponent } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { CreateProps } from '../create-props';
/**
 * Props for the {@link AutocompletePopover} component.
 */
export interface AutocompletePopoverProps extends Partial<CreateProps<Props, Events>> {
}
export declare const AutocompletePopover: typeof SvelteComponent<AutocompletePopoverProps & HTMLAttributes<AutocompletePopoverElement>>;
//# sourceMappingURL=autocomplete-popover.gen.d.ts.map
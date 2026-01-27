import type { AutocompleteItemElement, AutocompleteItemProps as Props, AutocompleteItemEvents as Events } from '@prosekit/web/autocomplete';
import type { SvelteComponent } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { CreateProps } from '../create-props';
/**
 * Props for the {@link AutocompleteItem} component.
 */
export interface AutocompleteItemProps extends Partial<CreateProps<Props, Events>> {
}
export declare const AutocompleteItem: typeof SvelteComponent<AutocompleteItemProps & HTMLAttributes<AutocompleteItemElement>>;
//# sourceMappingURL=autocomplete-item.gen.d.ts.map
import type { AutocompleteListElement, AutocompleteListProps as Props, AutocompleteListEvents as Events } from '@prosekit/web/autocomplete';
import type { SvelteComponent } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { CreateProps } from '../create-props';
/**
 * Props for the {@link AutocompleteList} component.
 */
export interface AutocompleteListProps extends Partial<CreateProps<Props, Events>> {
}
export declare const AutocompleteList: typeof SvelteComponent<AutocompleteListProps & HTMLAttributes<AutocompleteListElement>>;
//# sourceMappingURL=autocomplete-list.gen.d.ts.map
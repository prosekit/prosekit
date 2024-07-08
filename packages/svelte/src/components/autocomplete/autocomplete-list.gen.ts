import type { AutocompleteListElement, AutocompleteListProps } from '@prosekit/web/autocomplete'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './autocomplete-list.gen.svelte'

export const AutocompleteList = Component as typeof SvelteComponent<Partial<AutocompleteListProps> & HTMLAttributes<AutocompleteListElement>>

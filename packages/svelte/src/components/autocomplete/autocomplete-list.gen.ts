import type { AutocompleteListProps } from '@prosekit/primitives/autocomplete'    
import type { SvelteComponent } from 'svelte'

import Component from './autocomplete-list.gen.svelte'

export const AutocompleteList = Component as typeof SvelteComponent<any> as typeof SvelteComponent<Partial<AutocompleteListProps> & {class?: number}>

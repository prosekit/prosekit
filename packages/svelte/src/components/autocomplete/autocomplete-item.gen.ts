import type { AutocompleteItemProps } from '@prosekit/primitives/autocomplete'    
import type { SvelteComponent } from 'svelte'

import Component from './autocomplete-item.gen.svelte'

export const AutocompleteItem = Component as typeof SvelteComponent<any> as typeof SvelteComponent<Partial<AutocompleteItemProps> & {class?: number}>

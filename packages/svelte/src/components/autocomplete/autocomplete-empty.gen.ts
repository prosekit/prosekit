import type { AutocompleteEmptyProps } from '@prosekit/web/autocomplete'    
import type { SvelteComponent } from 'svelte'

import Component from './autocomplete-empty.gen.svelte'

export const AutocompleteEmpty = Component as typeof SvelteComponent<any> as typeof SvelteComponent<Partial<AutocompleteEmptyProps> & {class?: number}>

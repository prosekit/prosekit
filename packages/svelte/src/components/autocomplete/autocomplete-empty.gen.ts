import type { AutocompleteEmptyElement, AutocompleteEmptyProps } from '@prosekit/web/autocomplete'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './autocomplete-empty.gen.svelte'

export const AutocompleteEmpty = Component as typeof SvelteComponent<Partial<AutocompleteEmptyProps> & HTMLAttributes<AutocompleteEmptyElement>>

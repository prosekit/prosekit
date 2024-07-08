import type { AutocompleteItemElement, AutocompleteItemProps } from '@prosekit/web/autocomplete'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './autocomplete-item.gen.svelte'

export const AutocompleteItem = Component as typeof SvelteComponent<Partial<AutocompleteItemProps> & HTMLAttributes<AutocompleteItemElement>>

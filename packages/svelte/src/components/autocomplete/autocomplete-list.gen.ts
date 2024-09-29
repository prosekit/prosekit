import type { AutocompleteListElement, AutocompleteListProps, AutocompleteListEvents } from '@prosekit/web/autocomplete'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './autocomplete-list.gen.svelte'

export const AutocompleteList = Component as typeof SvelteComponent<Partial<CreateProps<AutocompleteListProps, AutocompleteListEvents>> & HTMLAttributes<AutocompleteListElement>>

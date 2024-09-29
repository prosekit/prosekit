import type { AutocompleteItemElement, AutocompleteItemProps, AutocompleteItemEvents } from '@prosekit/web/autocomplete'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './autocomplete-item.gen.svelte'

export const AutocompleteItem = Component as typeof SvelteComponent<Partial<CreateProps<AutocompleteItemProps, AutocompleteItemEvents>> & HTMLAttributes<AutocompleteItemElement>>

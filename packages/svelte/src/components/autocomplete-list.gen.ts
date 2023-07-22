import type { AutocompleteListProps as AutocompleteListElementProps } from '@prosekit/lit/components/autocomplete-list'
import type { SvelteComponent } from 'svelte'

import AutocompleteListComponent from './autocomplete-list.gen.svelte'

export type AutocompleteListProps = {
  class?: string
} & AutocompleteListElementProps

export const AutocompleteList = AutocompleteListComponent as typeof SvelteComponent<any> as typeof SvelteComponent<AutocompleteListProps>

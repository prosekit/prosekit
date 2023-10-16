import type { AutocompleteEmptyProps as AutocompleteEmptyElementProps } from '@prosekit/lit/autocomplete-empty'
import type { SvelteComponent } from 'svelte'

import AutocompleteEmptyComponent from './autocomplete-empty.gen.svelte'

export type AutocompleteEmptyProps = {
  class?: string
} & AutocompleteEmptyElementProps

export const AutocompleteEmpty = AutocompleteEmptyComponent as typeof SvelteComponent<any> as typeof SvelteComponent<AutocompleteEmptyProps>

import type { AutocompleteListProps as AutocompleteListElementProps } from '@prosekit/lit/autocomplete-list'
import type { SvelteComponent } from 'svelte'

import type { PropsWithClass } from '../types'

import AutocompleteListComponent from './autocomplete-list.gen.svelte'

export type AutocompleteListProps = PropsWithClass<AutocompleteListElementProps>

export const AutocompleteList = AutocompleteListComponent as typeof SvelteComponent<any> as typeof SvelteComponent<AutocompleteListProps>

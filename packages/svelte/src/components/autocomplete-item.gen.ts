import type { AutocompleteItemProps as AutocompleteItemElementProps } from '@prosekit/lit/autocomplete-item'
import type { SvelteComponent } from 'svelte'

import type { PropsWithClass } from '../types'

import AutocompleteItemComponent from './autocomplete-item.gen.svelte'

export type AutocompleteItemProps = PropsWithClass<AutocompleteItemElementProps>

export const AutocompleteItem = AutocompleteItemComponent as typeof SvelteComponent<any> as typeof SvelteComponent<AutocompleteItemProps>

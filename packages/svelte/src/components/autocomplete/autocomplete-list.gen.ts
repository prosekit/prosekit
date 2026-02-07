import type { AutocompleteListElement, AutocompleteListProps as Props, AutocompleteListEvents as Events } from '@prosekit/web/autocomplete'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props.ts'

import Component from './autocomplete-list.gen.svelte'

/**
 * Props for the {@link AutocompleteList} component.
 */
export interface AutocompleteListProps extends Partial<CreateProps<Props, Events>> {}

export const AutocompleteList = Component as typeof SvelteComponent<AutocompleteListProps & HTMLAttributes<AutocompleteListElement>>

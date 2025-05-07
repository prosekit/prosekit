import type { AutocompleteEmptyElement, AutocompleteEmptyProps as Props, AutocompleteEmptyEvents as Events } from '@prosekit/web/autocomplete'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './autocomplete-empty.gen.svelte'

/**
 * Props for the {@link AutocompleteEmpty} component.
 */
export interface AutocompleteEmptyProps extends Partial<CreateProps<Props, Events>> {}

export const AutocompleteEmpty = Component as typeof SvelteComponent<AutocompleteEmptyProps & HTMLAttributes<AutocompleteEmptyElement>>

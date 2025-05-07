import { 
  type AutocompleteListElement,
  type AutocompleteListProps as Props,
  type AutocompleteListEvents as Events,
  autocompleteListProps,
  autocompleteListEvents,
} from '@prosekit/web/autocomplete'
import type { Component } from 'solid-js'

import type { PropsWithElement } from '../../types'
import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link AutocompleteList} component.
 */
export interface AutocompleteListProps extends Partial<CreateProps<Props, Events>> {}

export const AutocompleteList: Component<PropsWithElement<
  AutocompleteListProps,
  AutocompleteListElement
>> = createComponent<
  AutocompleteListProps,
  AutocompleteListElement
>(
  'prosekit-autocomplete-list', 
  Object.keys(autocompleteListProps),
  Object.keys(autocompleteListEvents),
)

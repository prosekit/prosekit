import { 
  type AutocompleteItemElement,
  type AutocompleteItemProps as Props,
  type AutocompleteItemEvents as Events,
  autocompleteItemProps,
  autocompleteItemEvents,
} from '@prosekit/web/autocomplete'
import type { Component } from 'solid-js'

import type { PropsWithElement } from '../../types'
import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link AutocompleteItem} component.
 */
export interface AutocompleteItemProps extends Partial<CreateProps<Props, Events>> {}

export const AutocompleteItem: Component<PropsWithElement<
  AutocompleteItemProps,
  AutocompleteItemElement
>> = createComponent<
  AutocompleteItemProps,
  AutocompleteItemElement
>(
  'prosekit-autocomplete-item', 
  Object.keys(autocompleteItemProps),
  Object.keys(autocompleteItemEvents),
)

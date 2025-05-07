import { 
  type AutocompleteEmptyElement,
  type AutocompleteEmptyProps as Props,
  type AutocompleteEmptyEvents as Events,
  autocompleteEmptyProps,
  autocompleteEmptyEvents,
} from '@prosekit/web/autocomplete'
import type { Component } from 'solid-js'

import type { PropsWithElement } from '../../types'
import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link AutocompleteEmpty} component.
 */
export interface AutocompleteEmptyProps extends Partial<CreateProps<Props, Events>> {}

export const AutocompleteEmpty: Component<PropsWithElement<
  AutocompleteEmptyProps,
  AutocompleteEmptyElement
>> = createComponent<
  AutocompleteEmptyProps,
  AutocompleteEmptyElement
>(
  'prosekit-autocomplete-empty', 
  Object.keys(autocompleteEmptyProps),
  Object.keys(autocompleteEmptyEvents),
)

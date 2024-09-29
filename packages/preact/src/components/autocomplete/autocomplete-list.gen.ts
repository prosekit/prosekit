import {
  type AutocompleteListElement,
  type AutocompleteListProps as Props,
  type AutocompleteListEvents as Events,
  autocompleteListProps,
  autocompleteListEvents,
} from '@prosekit/web/autocomplete'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

export type AutocompleteListProps = CreateProps<Props, Events>
 
export const AutocompleteList: ForwardRefExoticComponent<
  Partial<AutocompleteListProps> &
  RefAttributes<AutocompleteListElement> &
  HTMLAttributes<AutocompleteListElement>
> = createComponent<
  AutocompleteListProps, 
  AutocompleteListElement
>(
  'prosekit-autocomplete-list',
  'AutocompleteList',
  Object.keys(autocompleteListProps),
  Object.keys(autocompleteListEvents),
)

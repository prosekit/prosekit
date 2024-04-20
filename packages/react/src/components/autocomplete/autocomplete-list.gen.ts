import {
  AutocompleteListElement,
  defaultAutocompleteListProps,
  type AutocompleteListProps,
} from '@prosekit/primitives/autocomplete'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'

export const AutocompleteList: ForwardRefExoticComponent<
  Partial<AutocompleteListProps> &
  RefAttributes<AutocompleteListElement> &
  HTMLAttributes<AutocompleteListElement>
> = createComponent<
  AutocompleteListProps, 
  AutocompleteListElement
>(
  'autocomplete-list-v2',
  'AutocompleteList',
  defaultAutocompleteListProps,
)

import {
  defaultAutocompleteListProps,
  type AutocompleteListElement,
  type AutocompleteListProps
} from '@prosekit/web/autocomplete'
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
  'prosekit-autocomplete-list',
  'AutocompleteList',
  defaultAutocompleteListProps,
)

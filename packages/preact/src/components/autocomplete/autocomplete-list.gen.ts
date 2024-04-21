import {
  AutocompleteListElement,
  defaultAutocompleteListProps,
  type AutocompleteListProps,
} from '@prosekit/web/autocomplete'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

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

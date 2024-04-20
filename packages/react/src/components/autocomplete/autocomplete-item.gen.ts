import {
  AutocompleteItemElement,
  defaultAutocompleteItemProps,
  type AutocompleteItemProps,
} from '@prosekit/primitives/autocomplete'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'

export const AutocompleteItem: ForwardRefExoticComponent<
  Partial<AutocompleteItemProps> &
  RefAttributes<AutocompleteItemElement> &
  HTMLAttributes<AutocompleteItemElement>
> = createComponent<
  AutocompleteItemProps, 
  AutocompleteItemElement
>(
  'prosekit-autocomplete-item',
  'AutocompleteItem',
  defaultAutocompleteItemProps,
)

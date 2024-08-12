import {
  defaultAutocompleteItemProps,
  type AutocompleteItemElement,
  type AutocompleteItemProps
} from '@prosekit/web/autocomplete'
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

import {
  defaultAutocompleteEmptyProps,
  type AutocompleteEmptyElement,
  type AutocompleteEmptyProps
} from '@prosekit/web/autocomplete'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'

export const AutocompleteEmpty: ForwardRefExoticComponent<
  Partial<AutocompleteEmptyProps> &
  RefAttributes<AutocompleteEmptyElement> &
  HTMLAttributes<AutocompleteEmptyElement>
> = createComponent<
  AutocompleteEmptyProps, 
  AutocompleteEmptyElement
>(
  'prosekit-autocomplete-empty',
  'AutocompleteEmpty',
  defaultAutocompleteEmptyProps,
)

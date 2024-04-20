import {
  AutocompleteEmptyElement,
  defaultAutocompleteEmptyProps,
  type AutocompleteEmptyProps,
} from '@prosekit/primitives/autocomplete'
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
  'autocomplete-empty-v2',
  'AutocompleteEmpty',
  defaultAutocompleteEmptyProps,
)

import { 
  AutocompleteListElement,
  defaultAutocompleteListProps,
  type AutocompleteListProps,
} from '@prosekit/primitives/autocomplete'

import { createComponent } from '../create-component'

export const AutocompleteList = createComponent<
  AutocompleteListProps,
  AutocompleteListElement
>(
  'prosekit-autocomplete-list', 
  'AutocompleteList',
  defaultAutocompleteListProps,
)

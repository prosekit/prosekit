import { 
  AutocompleteListElement,
  defaultAutocompleteListProps,
  type AutocompleteListProps,
} from '@prosekit/web/autocomplete'

import { createComponent } from '../create-component'

export const AutocompleteList = createComponent<
  AutocompleteListProps,
  AutocompleteListElement
>(
  'prosekit-autocomplete-list', 
  defaultAutocompleteListProps,
)

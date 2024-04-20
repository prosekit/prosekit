import { 
  AutocompleteItemElement,
  defaultAutocompleteItemProps,
  type AutocompleteItemProps,
} from '@prosekit/primitives/autocomplete'

import { createComponent } from '../create-component'

export const AutocompleteItem = createComponent<
  AutocompleteItemProps,
  AutocompleteItemElement
>(
  'prosekit-autocomplete-item', 
  'AutocompleteItem',
  defaultAutocompleteItemProps,
)

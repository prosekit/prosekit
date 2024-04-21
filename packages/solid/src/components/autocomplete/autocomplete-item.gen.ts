import { 
  AutocompleteItemElement,
  defaultAutocompleteItemProps,
  type AutocompleteItemProps,
} from '@prosekit/web/autocomplete'

import { createComponent } from '../create-component'

export const AutocompleteItem = createComponent<
  AutocompleteItemProps,
  AutocompleteItemElement
>(
  'prosekit-autocomplete-item', 
  'AutocompleteItem',
  defaultAutocompleteItemProps,
)

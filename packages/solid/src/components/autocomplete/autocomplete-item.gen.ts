import { 
  autocompleteItemProps,
  autocompleteItemEvents,
  type AutocompleteItemElement,
  type AutocompleteItemProps,
} from '@prosekit/web/autocomplete'

import { createComponent } from '../create-component'

export const AutocompleteItem = createComponent<
  AutocompleteItemProps,
  AutocompleteItemElement
>(
  'prosekit-autocomplete-item', 
  Object.keys(autocompleteItemProps),
  Object.keys(autocompleteItemEvents),
)

import { 
  autocompleteEmptyProps,
  autocompleteEmptyEvents,
  type AutocompleteEmptyElement,
  type AutocompleteEmptyProps,
} from '@prosekit/web/autocomplete'

import { createComponent } from '../create-component'

export const AutocompleteEmpty = createComponent<
  AutocompleteEmptyProps,
  AutocompleteEmptyElement
>(
  'prosekit-autocomplete-empty', 
  Object.keys(autocompleteEmptyProps),
  Object.keys(autocompleteEmptyEvents),
)

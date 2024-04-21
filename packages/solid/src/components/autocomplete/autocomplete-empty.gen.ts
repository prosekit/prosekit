import { 
  AutocompleteEmptyElement,
  defaultAutocompleteEmptyProps,
  type AutocompleteEmptyProps,
} from '@prosekit/web/autocomplete'

import { createComponent } from '../create-component'

export const AutocompleteEmpty = createComponent<
  AutocompleteEmptyProps,
  AutocompleteEmptyElement
>(
  'prosekit-autocomplete-empty', 
  'AutocompleteEmpty',
  defaultAutocompleteEmptyProps,
)

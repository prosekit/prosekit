import '@prosekit/web/autocomplete'

import type { 
  AutocompleteEmptyElement,
  AutocompleteEmptyProps,
} from '@prosekit/web/autocomplete'

import { createComponent } from '../create-component'

export const AutocompleteEmpty = createComponent<
  AutocompleteEmptyProps,
  AutocompleteEmptyElement
>(
  'prosekit-autocomplete-empty', 
  'AutocompleteEmpty',
)

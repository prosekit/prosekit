import '@prosekit/primitives/autocomplete'

import type { 
  AutocompleteEmptyElement,
  AutocompleteEmptyProps,
} from '@prosekit/primitives/autocomplete'

import { createComponent } from '../create-component'

export const AutocompleteEmpty = createComponent<
  AutocompleteEmptyProps,
  AutocompleteEmptyElement
>(
  'prosekit-autocomplete-empty', 
  'AutocompleteEmpty',
)

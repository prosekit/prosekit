import '@prosekit/primitives/autocomplete'

import type { 
  AutocompleteItemElement,
  AutocompleteItemProps,
} from '@prosekit/primitives/autocomplete'

import { createComponent } from '../create-component'

export const AutocompleteItem = createComponent<
  AutocompleteItemProps,
  AutocompleteItemElement
>(
  'prosekit-autocomplete-item', 
  'AutocompleteItem',
)

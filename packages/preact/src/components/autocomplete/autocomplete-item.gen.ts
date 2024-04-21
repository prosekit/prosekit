import '@prosekit/web/autocomplete'

import type { 
  AutocompleteItemElement,
  AutocompleteItemProps,
} from '@prosekit/web/autocomplete'

import { createComponent } from '../create-component'

export const AutocompleteItem = createComponent<
  AutocompleteItemProps,
  AutocompleteItemElement
>(
  'prosekit-autocomplete-item', 
  'AutocompleteItem',
)

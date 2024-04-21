import '@prosekit/web/autocomplete'

import type { 
  AutocompleteListElement,
  AutocompleteListProps,
} from '@prosekit/web/autocomplete'

import { createComponent } from '../create-component'

export const AutocompleteList = createComponent<
  AutocompleteListProps,
  AutocompleteListElement
>(
  'prosekit-autocomplete-list', 
  'AutocompleteList',
)

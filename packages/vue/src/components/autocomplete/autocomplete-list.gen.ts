import { autocompleteListProps, autocompleteListEvents, type AutocompleteListProps, type AutocompleteListEvents } from '@prosekit/web/autocomplete'

import { createComponent } from '../create-component'

export const AutocompleteList = createComponent<
  AutocompleteListProps,
  AutocompleteListEvents
>(
  'prosekit-autocomplete-list',
  'AutocompleteList',
  Object.keys(autocompleteListProps),
  Object.keys(autocompleteListEvents),
)

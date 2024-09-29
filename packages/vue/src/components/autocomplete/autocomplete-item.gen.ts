import { autocompleteItemProps, autocompleteItemEvents, type AutocompleteItemProps, type AutocompleteItemEvents } from '@prosekit/web/autocomplete'

import { createComponent } from '../create-component'

export const AutocompleteItem = createComponent<
  AutocompleteItemProps,
  AutocompleteItemEvents
>(
  'prosekit-autocomplete-item',
  'AutocompleteItem',
  Object.keys(autocompleteItemProps),
  Object.keys(autocompleteItemEvents),
)

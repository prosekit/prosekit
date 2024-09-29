import { autocompleteEmptyProps, autocompleteEmptyEvents, type AutocompleteEmptyProps, type AutocompleteEmptyEvents } from '@prosekit/web/autocomplete'

import { createComponent } from '../create-component'

export const AutocompleteEmpty = createComponent<
  AutocompleteEmptyProps,
  AutocompleteEmptyEvents
>(
  'prosekit-autocomplete-empty',
  'AutocompleteEmpty',
  Object.keys(autocompleteEmptyProps),
  Object.keys(autocompleteEmptyEvents),
)

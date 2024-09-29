import { autocompletePopoverProps, autocompletePopoverEvents, type AutocompletePopoverProps, type AutocompletePopoverEvents } from '@prosekit/web/autocomplete'

import { createComponent } from '../create-component'

export const AutocompletePopover = createComponent<
  AutocompletePopoverProps,
  AutocompletePopoverEvents
>(
  'prosekit-autocomplete-popover',
  'AutocompletePopover',
  Object.keys(autocompletePopoverProps),
  Object.keys(autocompletePopoverEvents),
)

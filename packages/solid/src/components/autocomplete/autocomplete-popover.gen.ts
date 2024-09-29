import { 
  autocompletePopoverProps,
  autocompletePopoverEvents,
  type AutocompletePopoverElement,
  type AutocompletePopoverProps,
} from '@prosekit/web/autocomplete'

import { createComponent } from '../create-component'

export const AutocompletePopover = createComponent<
  AutocompletePopoverProps,
  AutocompletePopoverElement
>(
  'prosekit-autocomplete-popover', 
  Object.keys(autocompletePopoverProps),
  Object.keys(autocompletePopoverEvents),
)

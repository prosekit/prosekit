import { 
  AutocompletePopoverElement,
  defaultAutocompletePopoverProps,
  type AutocompletePopoverProps,
} from '@prosekit/web/autocomplete'

import { createComponent } from '../create-component'

export const AutocompletePopover = createComponent<
  AutocompletePopoverProps,
  AutocompletePopoverElement
>(
  'prosekit-autocomplete-popover', 
  'AutocompletePopover',
  defaultAutocompletePopoverProps,
)

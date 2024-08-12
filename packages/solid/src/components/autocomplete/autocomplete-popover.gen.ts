import { 
  defaultAutocompletePopoverProps,
  type AutocompletePopoverElement,
  type AutocompletePopoverProps,
} from '@prosekit/web/autocomplete'

import { createComponent } from '../create-component'

export const AutocompletePopover = createComponent<
  AutocompletePopoverProps,
  AutocompletePopoverElement
>(
  'prosekit-autocomplete-popover', 
  defaultAutocompletePopoverProps,
)

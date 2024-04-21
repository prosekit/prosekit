import '@prosekit/web/autocomplete'

import type { 
  AutocompletePopoverElement,
  AutocompletePopoverProps,
} from '@prosekit/web/autocomplete'

import { createComponent } from '../create-component'

export const AutocompletePopover = createComponent<
  AutocompletePopoverProps,
  AutocompletePopoverElement
>(
  'prosekit-autocomplete-popover', 
  'AutocompletePopover',
)

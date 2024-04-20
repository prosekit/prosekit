import '@prosekit/primitives/autocomplete'

import type { 
  AutocompletePopoverElement,
  AutocompletePopoverProps,
} from '@prosekit/primitives/autocomplete'

import { createComponent } from '../create-component'

export const AutocompletePopover = createComponent<
  AutocompletePopoverProps,
  AutocompletePopoverElement
>(
  'prosekit-autocomplete-popover', 
  'AutocompletePopover',
)

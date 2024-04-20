import {
  AutocompletePopoverElement,
  defaultAutocompletePopoverProps,
  type AutocompletePopoverProps,
} from '@prosekit/primitives/autocomplete'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'

export const AutocompletePopover: ForwardRefExoticComponent<
  Partial<AutocompletePopoverProps> &
  RefAttributes<AutocompletePopoverElement> &
  HTMLAttributes<AutocompletePopoverElement>
> = createComponent<
  AutocompletePopoverProps, 
  AutocompletePopoverElement
>(
  'prosekit-autocomplete-popover',
  'AutocompletePopover',
  defaultAutocompletePopoverProps,
)

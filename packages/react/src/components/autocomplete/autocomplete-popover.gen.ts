import {
  type AutocompletePopoverElement,
  type AutocompletePopoverProps as Props,
  type AutocompletePopoverEvents as Events,
  autocompletePopoverProps,
  autocompletePopoverEvents,
} from '@prosekit/web/autocomplete'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

export type AutocompletePopoverProps = CreateProps<Props, Events>
 
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
  Object.keys(autocompletePopoverProps),
  Object.keys(autocompletePopoverEvents),
)

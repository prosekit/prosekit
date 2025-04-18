import { 
  type AutocompletePopoverElement,
  type AutocompletePopoverProps as Props,
  type AutocompletePopoverEvents as Events,
  autocompletePopoverProps,
  autocompletePopoverEvents,
} from '@prosekit/web/autocomplete'
import type { Component } from 'solid-js'

import type { PropsWithElement } from '../../types'
import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link AutocompletePopover} component.
 */
export interface AutocompletePopoverProps extends Partial<CreateProps<Props, Events>> {}

export const AutocompletePopover: Component<PropsWithElement<
  AutocompletePopoverProps,
  AutocompletePopoverElement
>> = createComponent<
  AutocompletePopoverProps,
  AutocompletePopoverElement
>(
  'prosekit-autocomplete-popover', 
  Object.keys(autocompletePopoverProps),
  Object.keys(autocompletePopoverEvents),
)

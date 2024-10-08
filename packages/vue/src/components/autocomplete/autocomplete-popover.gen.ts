import {
  autocompletePopoverProps,
  autocompletePopoverEvents,
  type AutocompletePopoverProps as Props,
  type AutocompletePopoverEvents as Events,
} from '@prosekit/web/autocomplete'

import { createComponent } from '../create-component'

/**
 * Props for the {@link AutocompletePopover} component.
 */
export interface AutocompletePopoverProps extends Partial<Props> {}

/**
 * Events for the {@link AutocompletePopover} component.
 */
export interface AutocompletePopoverEvents extends Partial<Events> {}

export const AutocompletePopover = createComponent<
  AutocompletePopoverProps,
  AutocompletePopoverEvents
>(
  'prosekit-autocomplete-popover',
  'AutocompletePopover',
  Object.keys(autocompletePopoverProps),
  Object.keys(autocompletePopoverEvents),
)

import {
  autocompleteItemProps,
  autocompleteItemEvents,
  type AutocompleteItemProps as Props,
  type AutocompleteItemEvents as Events,
} from '@prosekit/web/autocomplete'

import { createComponent } from '../create-component'

/**
 * Props for the {@link AutocompleteItem} component.
 */
export interface AutocompleteItemProps extends Partial<Props> {}

/**
 * Events for the {@link AutocompleteItem} component.
 */
export interface AutocompleteItemEvents extends Partial<Events> {}

export const AutocompleteItem = createComponent<
  AutocompleteItemProps,
  AutocompleteItemEvents
>(
  'prosekit-autocomplete-item',
  'AutocompleteItem',
  Object.keys(autocompleteItemProps),
  Object.keys(autocompleteItemEvents),
)

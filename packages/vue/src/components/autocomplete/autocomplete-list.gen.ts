import {
  autocompleteListProps,
  autocompleteListEvents,
  type AutocompleteListProps as Props,
  type AutocompleteListEvents as Events,
} from '@prosekit/web/autocomplete'

import { createComponent } from '../create-component'

/**
 * Props for the {@link AutocompleteList} component.
 */
export interface AutocompleteListProps extends Partial<Props> {}

/**
 * Events for the {@link AutocompleteList} component.
 */
export interface AutocompleteListEvents extends Partial<Events> {}

export const AutocompleteList = createComponent<
  AutocompleteListProps,
  AutocompleteListEvents
>(
  'prosekit-autocomplete-list',
  'AutocompleteList',
  Object.keys(autocompleteListProps),
  Object.keys(autocompleteListEvents),
)

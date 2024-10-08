import {
  autocompleteEmptyProps,
  autocompleteEmptyEvents,
  type AutocompleteEmptyProps as Props,
  type AutocompleteEmptyEvents as Events,
} from '@prosekit/web/autocomplete'

import { createComponent } from '../create-component'

/**
 * Props for the {@link AutocompleteEmpty} component.
 */
export interface AutocompleteEmptyProps extends Partial<Props> {}

/**
 * Events for the {@link AutocompleteEmpty} component.
 */
export interface AutocompleteEmptyEvents extends Partial<Events> {}

export const AutocompleteEmpty = createComponent<
  AutocompleteEmptyProps,
  AutocompleteEmptyEvents
>(
  'prosekit-autocomplete-empty',
  'AutocompleteEmpty',
  Object.keys(autocompleteEmptyProps),
  Object.keys(autocompleteEmptyEvents),
)

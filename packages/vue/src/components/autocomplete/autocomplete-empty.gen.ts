import {
  autocompleteEmptyProps,
  autocompleteEmptyEvents,
  type AutocompleteEmptyProps as Props,
  type AutocompleteEmptyEvents as Events,
} from '@prosekit/web/autocomplete'

import { createComponent } from '../create-component'
import type { CreateEmits } from '../create-emits'

/**
 * Props for the {@link AutocompleteEmpty} component.
 */
export interface AutocompleteEmptyProps extends Partial<Props> {}

/**
 * Emits for the {@link AutocompleteEmpty} component.
 */
export interface AutocompleteEmptyEmits extends CreateEmits<Events> {}

export const AutocompleteEmpty: DefineSetupFnComponent<
  AutocompleteEmptyProps & HTMLAttributes,
  AutocompleteEmptyEmits
> = createComponent<
  AutocompleteEmptyProps,
  AutocompleteEmptyEmits
>(
  'prosekit-autocomplete-empty',
  'AutocompleteEmpty',
  Object.keys(autocompleteEmptyProps),
  Object.keys(autocompleteEmptyEvents),
)

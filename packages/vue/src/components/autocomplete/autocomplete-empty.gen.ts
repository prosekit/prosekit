import {
  autocompleteEmptyProps,
  autocompleteEmptyEvents,
  type AutocompleteEmptyProps as Props,
  type AutocompleteEmptyEvents as Events,
} from '@prosekit/web/autocomplete'
import type { DefineSetupFnComponent, HTMLAttributes } from 'vue'

import { createComponent } from '../create-component.ts'
import type { CreateEmits } from '../create-emits.ts'

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

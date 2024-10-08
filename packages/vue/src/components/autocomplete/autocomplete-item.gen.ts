import {
  autocompleteItemProps,
  autocompleteItemEvents,
  type AutocompleteItemProps as Props,
  type AutocompleteItemEvents as Events,
} from '@prosekit/web/autocomplete'

import { createComponent } from '../create-component'
import type { CreateEmits } from '../create-emits'

/**
 * Props for the {@link AutocompleteItem} component.
 */
export interface AutocompleteItemProps extends Partial<Props> {}

/**
 * Emits for the {@link AutocompleteItem} component.
 */
export interface AutocompleteItemEmits extends CreateEmits<Events> {}

export const AutocompleteItem: DefineSetupFnComponent<
  AutocompleteItemProps & HTMLAttributes,
  AutocompleteItemEmits
> = createComponent<
  AutocompleteItemProps,
  AutocompleteItemEmits
>(
  'prosekit-autocomplete-item',
  'AutocompleteItem',
  Object.keys(autocompleteItemProps),
  Object.keys(autocompleteItemEvents),
)

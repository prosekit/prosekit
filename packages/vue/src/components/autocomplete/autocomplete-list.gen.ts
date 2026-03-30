import {
  autocompleteListProps,
  autocompleteListEvents,
  type AutocompleteListProps as Props,
  type AutocompleteListEvents as Events,
} from '@prosekit/web/autocomplete'
import type { DefineSetupFnComponent, HTMLAttributes } from 'vue'

import { createComponent } from '../create-component.ts'
import type { CreateEmits } from '../create-emits.ts'

/**
 * Props for the {@link AutocompleteList} component.
 */
export interface AutocompleteListProps extends Partial<Props> {}

/**
 * Emits for the {@link AutocompleteList} component.
 */
export interface AutocompleteListEmits extends CreateEmits<Events> {}

export const AutocompleteList: DefineSetupFnComponent<
  AutocompleteListProps & HTMLAttributes,
  AutocompleteListEmits
> = createComponent<
  AutocompleteListProps,
  AutocompleteListEmits
>(
  'prosekit-autocomplete-list',
  'AutocompleteList',
  Object.keys(autocompleteListProps),
  Object.keys(autocompleteListEvents),
)

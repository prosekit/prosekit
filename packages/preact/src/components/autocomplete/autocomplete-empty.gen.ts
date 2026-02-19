import {
  type AutocompleteEmptyElement,
  type AutocompleteEmptyProps as Props,
  type AutocompleteEmptyEvents as Events,
  autocompleteEmptyProps,
  autocompleteEmptyEvents,
} from '@prosekit/web/autocomplete'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component.ts'
import type { CreateProps } from '../create-props.ts'

/**
 * Props for the {@link AutocompleteEmpty} component.
 */
export interface AutocompleteEmptyProps extends Partial<CreateProps<Props, Events>> {}

export const AutocompleteEmpty: ForwardRefExoticComponent<
  Partial<AutocompleteEmptyProps> &
  RefAttributes<AutocompleteEmptyElement> &
  HTMLAttributes<AutocompleteEmptyElement>
> = createComponent<
  AutocompleteEmptyProps,
  AutocompleteEmptyElement
>(
  'prosekit-autocomplete-empty',
  'AutocompleteEmpty',
  Object.keys(autocompleteEmptyProps),
  Object.keys(autocompleteEmptyEvents),
)

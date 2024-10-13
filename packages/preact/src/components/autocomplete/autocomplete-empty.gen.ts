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

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link AutocompleteEmpty} component.
 */
export type AutocompleteEmptyProps = Partial<CreateProps<Props, Events>>
 
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

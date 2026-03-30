import {
  type AutocompleteItemElement,
  type AutocompleteItemProps as Props,
  type AutocompleteItemEvents as Events,
  autocompleteItemProps,
  autocompleteItemEvents,
} from '@prosekit/web/autocomplete'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component.ts'
import type { CreateProps } from '../create-props.ts'

/**
 * Props for the {@link AutocompleteItem} component.
 */
export interface AutocompleteItemProps extends Partial<CreateProps<Props, Events>> {}

export const AutocompleteItem: ForwardRefExoticComponent<
  Partial<AutocompleteItemProps> &
  RefAttributes<AutocompleteItemElement> &
  HTMLAttributes<AutocompleteItemElement>
> = createComponent<
  AutocompleteItemProps,
  AutocompleteItemElement
>(
  'prosekit-autocomplete-item',
  'AutocompleteItem',
  Object.keys(autocompleteItemProps),
  Object.keys(autocompleteItemEvents),
)

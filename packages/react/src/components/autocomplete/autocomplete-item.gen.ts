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
} from 'react'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

export type AutocompleteItemProps = CreateProps<Props, Events>
 
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

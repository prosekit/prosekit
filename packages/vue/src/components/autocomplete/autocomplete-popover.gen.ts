import {
  autocompletePopoverProps,
  autocompletePopoverEvents,
  type AutocompletePopoverProps as Props,
  type AutocompletePopoverEvents as Events,
} from '@prosekit/web/autocomplete'
import type { DefineSetupFnComponent, HTMLAttributes } from 'vue'

import { createComponent } from '../create-component.ts'
import type { CreateEmits } from '../create-emits.ts'

/**
 * Props for the {@link AutocompletePopover} component.
 */
export interface AutocompletePopoverProps extends Partial<Props> {}

/**
 * Emits for the {@link AutocompletePopover} component.
 */
export interface AutocompletePopoverEmits extends CreateEmits<Events> {}

export const AutocompletePopover: DefineSetupFnComponent<
  AutocompletePopoverProps & HTMLAttributes,
  AutocompletePopoverEmits
> = createComponent<
  AutocompletePopoverProps,
  AutocompletePopoverEmits
>(
  'prosekit-autocomplete-popover',
  'AutocompletePopover',
  Object.keys(autocompletePopoverProps),
  Object.keys(autocompletePopoverEvents),
)

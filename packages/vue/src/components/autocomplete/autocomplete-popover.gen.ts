import { defaultAutocompletePopoverProps, type AutocompletePopoverProps } from '@prosekit/web/autocomplete'

import { createComponent } from '../create-component'

export const AutocompletePopover = createComponent<AutocompletePopoverProps>('prosekit-autocomplete-popover', 'AutocompletePopover', defaultAutocompletePopoverProps)

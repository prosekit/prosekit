import { ElementBuilder } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultAutocompletePopoverProps, type AutocompletePopoverProps } from './props'
import { useAutocompletePopover } from './state'

class AutocompletePopoverElement extends ElementBuilder<AutocompletePopoverProps>(useAutocompletePopover, defaultAutocompletePopoverProps) {}

defineCustomElement('prosekit-autocomplete-popover', AutocompletePopoverElement)

export { AutocompletePopoverElement }

import { ElementMixin } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultAutocompleteItemProps, type AutocompleteItemProps } from './props'
import { useAutocompleteItem } from './state'

class AutocompleteItemElement extends ElementMixin<AutocompleteItemProps>(useAutocompleteItem, defaultAutocompleteItemProps) {}

defineCustomElement('prosekit-autocomplete-item', AutocompleteItemElement)

export { AutocompleteItemElement }

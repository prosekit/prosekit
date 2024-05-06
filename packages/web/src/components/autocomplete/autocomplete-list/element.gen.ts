import { ElementMixin } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultAutocompleteListProps, type AutocompleteListProps } from './props'
import { useAutocompleteList } from './state'

class AutocompleteListElement extends ElementMixin<AutocompleteListProps>(useAutocompleteList, defaultAutocompleteListProps) {}

defineCustomElement('prosekit-autocomplete-list', AutocompleteListElement)

export { AutocompleteListElement }

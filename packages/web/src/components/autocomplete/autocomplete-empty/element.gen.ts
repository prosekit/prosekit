import { ElementMixin } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultAutocompleteEmptyProps, type AutocompleteEmptyProps } from './props'
import { useAutocompleteEmpty } from './state'

class AutocompleteEmptyElement extends ElementMixin<AutocompleteEmptyProps>(useAutocompleteEmpty, defaultAutocompleteEmptyProps) {}

defineCustomElement('prosekit-autocomplete-empty', AutocompleteEmptyElement)

export { AutocompleteEmptyElement }

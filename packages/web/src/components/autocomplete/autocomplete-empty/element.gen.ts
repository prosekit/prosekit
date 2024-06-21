import { ElementBuilder } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultAutocompleteEmptyProps, type AutocompleteEmptyProps } from './props'
import { useAutocompleteEmpty } from './state'

class AutocompleteEmptyElement extends ElementBuilder<AutocompleteEmptyProps>(useAutocompleteEmpty, defaultAutocompleteEmptyProps) {}

defineCustomElement('prosekit-autocomplete-empty', AutocompleteEmptyElement)

export { AutocompleteEmptyElement }

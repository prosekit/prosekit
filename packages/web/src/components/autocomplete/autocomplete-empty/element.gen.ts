import { BaseElement, type SignalState } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'
import { defineProperties } from '../../../utils/define-properties'

import { defaultAutocompleteEmptyProps, type AutocompleteEmptyProps } from './props'
import { useAutocompleteEmpty } from './state'

class AutocompleteEmptyElement extends BaseElement implements AutocompleteEmptyProps {
  readonly _s: SignalState<AutocompleteEmptyProps>

  constructor() {
    super()
    this._s = useAutocompleteEmpty(this)
  }
}

interface AutocompleteEmptyElement extends AutocompleteEmptyProps {}

defineProperties(AutocompleteEmptyElement, defaultAutocompleteEmptyProps)

defineCustomElement('prosekit-autocomplete-empty', AutocompleteEmptyElement)

export { AutocompleteEmptyElement }

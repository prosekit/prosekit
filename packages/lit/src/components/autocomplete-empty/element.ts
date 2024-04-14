import { BaseElement, type SignalState } from '@aria-ui/core'

import { defineCustomElement } from '../../utils/define-custom-element'
import { defineProperties } from '../../utils/define-properties'

import {
  defaultAutocompleteEmptyProps,
  type AutocompleteEmptyProps,
} from './props'
import { useAutocompleteEmpty } from './state'

class AutocompleteEmpty extends BaseElement implements AutocompleteEmptyProps {
  readonly _s: SignalState<AutocompleteEmptyProps>

  constructor(props?: Partial<AutocompleteEmptyProps>) {
    super()
    this._s = useAutocompleteEmpty(this, props)
  }
}

interface AutocompleteEmpty extends AutocompleteEmptyProps {}

defineProperties(AutocompleteEmpty, defaultAutocompleteEmptyProps)

defineCustomElement('prosekit-autocomplete-empty', AutocompleteEmpty)

export { AutocompleteEmpty }

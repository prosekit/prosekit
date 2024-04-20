import { BaseElement, type SignalState } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'
import { defineProperties } from '../../../utils/define-properties'

import { defaultAutocompleteListProps, type AutocompleteListProps } from './props'
import { useAutocompleteList } from './state'

class AutocompleteListElement extends BaseElement implements AutocompleteListProps {
  readonly _s: SignalState<AutocompleteListProps>

  constructor() {
    super()
    this._s = useAutocompleteList(this)
  }
}

interface AutocompleteListElement extends AutocompleteListProps {}

defineProperties(AutocompleteListElement, defaultAutocompleteListProps)

defineCustomElement('prosekit-autocomplete-list-v2', AutocompleteListElement)

export { AutocompleteListElement }

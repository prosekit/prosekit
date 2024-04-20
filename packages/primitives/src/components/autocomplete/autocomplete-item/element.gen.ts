import { BaseElement, type SignalState } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'
import { defineProperties } from '../../../utils/define-properties'

import { defaultAutocompleteItemProps, type AutocompleteItemProps } from './props'
import { useAutocompleteItem } from './state'

class AutocompleteItemElement extends BaseElement implements AutocompleteItemProps {
  readonly _s: SignalState<AutocompleteItemProps>

  constructor() {
    super()
    this._s = useAutocompleteItem(this)
  }
}

interface AutocompleteItemElement extends AutocompleteItemProps {}

defineProperties(AutocompleteItemElement, defaultAutocompleteItemProps)

defineCustomElement('prosekit-autocomplete-item', AutocompleteItemElement)

export { AutocompleteItemElement }

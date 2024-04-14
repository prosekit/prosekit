import { BaseElement, type SignalState } from '@aria-ui/core'

import { defineCustomElement } from '../../utils/define-custom-element'
import { defineProperties } from '../../utils/define-properties'

import {
  defaultAutocompleteItemProps,
  type AutocompleteItemProps,
} from './props'
import { useAutocompleteItem } from './state'

class AutocompleteItem extends BaseElement implements AutocompleteItemProps {
  readonly _s: SignalState<AutocompleteItemProps>

  constructor(props?: Partial<AutocompleteItemProps>) {
    super()
    this._s = useAutocompleteItem(this, props)
  }
}

interface AutocompleteItem extends AutocompleteItemProps {}

defineProperties(AutocompleteItem, defaultAutocompleteItemProps)

defineCustomElement('prosekit-autocomplete-item', AutocompleteItem)

export { AutocompleteItem }

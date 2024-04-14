import { BaseElement, type SignalState } from '@aria-ui/core'

import { defineCustomElement } from '../../utils/define-custom-element'
import { defineProperties } from '../../utils/define-properties'

import {
  defaultAutocompleteListProps,
  type AutocompleteListProps,
} from './props'
import { useAutocompleteList } from './state'

class AutocompleteList extends BaseElement implements AutocompleteListProps {
  readonly _s: SignalState<AutocompleteListProps>

  constructor(props?: Partial<AutocompleteListProps>) {
    super()
    this._s = useAutocompleteList(this, props)
  }
}

interface AutocompleteList extends AutocompleteListProps {}

defineProperties(AutocompleteList, defaultAutocompleteListProps)

defineCustomElement('prosekit-autocomplete-list', AutocompleteList)

export { AutocompleteList }

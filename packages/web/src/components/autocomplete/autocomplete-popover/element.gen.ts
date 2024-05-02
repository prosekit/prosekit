import { BaseElement, type SignalState } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'
import { defineProperties } from '../../../utils/define-properties'

import { defaultAutocompletePopoverProps, type AutocompletePopoverProps } from './props'
import { useAutocompletePopover } from './state'

class AutocompletePopoverElement extends BaseElement implements AutocompletePopoverProps {
  readonly _s: SignalState<AutocompletePopoverProps>

  constructor() {
    super()
    this._s = useAutocompletePopover(this)
  }
}

interface AutocompletePopoverElement extends AutocompletePopoverProps {}

defineProperties(AutocompletePopoverElement, defaultAutocompletePopoverProps)

defineCustomElement('prosekit-autocomplete-popover', AutocompletePopoverElement)

export { AutocompletePopoverElement }

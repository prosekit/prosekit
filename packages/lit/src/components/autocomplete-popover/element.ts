import { BaseElement, type SingalState } from '@aria-ui/core'

import { defineCustomElement } from '../../utils/define-custom-element'
import { defineProperties } from '../../utils/define-properties'

import {
  defaultAutocompletePopoverProps,
  type AutocompletePopoverProps,
} from './props'
import { useAutocompletePopover } from './state'

class AutocompletePopover
  extends BaseElement
  implements AutocompletePopoverProps
{
  readonly _s: SingalState<AutocompletePopoverProps>

  constructor(props?: Partial<AutocompletePopoverProps>) {
    super()
    this._s = useAutocompletePopover(this, props)
  }
}

interface AutocompletePopover extends AutocompletePopoverProps {}

defineProperties(AutocompletePopover, defaultAutocompletePopoverProps)

defineCustomElement('prosekit-autocomplete-popover', AutocompletePopover)

export { AutocompletePopover }

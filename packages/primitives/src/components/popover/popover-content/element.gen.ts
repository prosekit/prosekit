import { BaseElement, type SignalState } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'
import { defineProperties } from '../../../utils/define-properties'

import { defaultPopoverContentProps, type PopoverContentProps } from './props'
import { usePopoverContent } from './state'

class PopoverContentElement extends BaseElement implements PopoverContentProps {
  readonly _s: SignalState<PopoverContentProps>

  constructor() {
    super()
    this._s = usePopoverContent(this)
  }
}

interface PopoverContentElement extends PopoverContentProps {}

defineProperties(PopoverContentElement, defaultPopoverContentProps)

defineCustomElement('prosekit-popover-content-v2', PopoverContentElement)

export { PopoverContentElement }

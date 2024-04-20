import { BaseElement, type SignalState } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'
import { defineProperties } from '../../../utils/define-properties'

import { defaultPopoverTriggerProps, type PopoverTriggerProps } from './props'
import { usePopoverTrigger } from './state'

class PopoverTriggerElement extends BaseElement implements PopoverTriggerProps {
  readonly _s: SignalState<PopoverTriggerProps>

  constructor() {
    super()
    this._s = usePopoverTrigger(this)
  }
}

interface PopoverTriggerElement extends PopoverTriggerProps {}

defineProperties(PopoverTriggerElement, defaultPopoverTriggerProps)

defineCustomElement('prosekit-popover-trigger-v2', PopoverTriggerElement)

export { PopoverTriggerElement }

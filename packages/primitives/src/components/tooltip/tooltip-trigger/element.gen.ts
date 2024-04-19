import { BaseElement, type SignalState } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'
import { defineProperties } from '../../../utils/define-properties'

import { defaultTooltipTriggerProps, type TooltipTriggerProps } from './props'
import { useTooltipTrigger } from './state'

class TooltipTriggerElement extends BaseElement implements TooltipTriggerProps {
  readonly _s: SignalState<TooltipTriggerProps>

  constructor() {
    super()
    this._s = useTooltipTrigger(this)
  }
}

interface TooltipTriggerElement extends TooltipTriggerProps {}

defineProperties(TooltipTriggerElement, defaultTooltipTriggerProps)

defineCustomElement('prosekit-resizable-root', TooltipTriggerElement)

export { TooltipTriggerElement }

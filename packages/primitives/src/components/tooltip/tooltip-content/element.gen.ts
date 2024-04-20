import { BaseElement, type SignalState } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'
import { defineProperties } from '../../../utils/define-properties'

import { defaultTooltipContentProps, type TooltipContentProps } from './props'
import { useTooltipContent } from './state'

class TooltipContentElement extends BaseElement implements TooltipContentProps {
  readonly _s: SignalState<TooltipContentProps>

  constructor() {
    super()
    this._s = useTooltipContent(this)
  }
}

interface TooltipContentElement extends TooltipContentProps {}

defineProperties(TooltipContentElement, defaultTooltipContentProps)

defineCustomElement('prosekit-tooltip-content', TooltipContentElement)

export { TooltipContentElement }

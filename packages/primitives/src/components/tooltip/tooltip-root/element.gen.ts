import { BaseElement, type SignalState } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'
import { defineProperties } from '../../../utils/define-properties'

import { defaultTooltipRootProps, type TooltipRootProps } from './props'
import { useTooltipRoot } from './state'

class TooltipRootElement extends BaseElement implements TooltipRootProps {
  readonly _s: SignalState<TooltipRootProps>

  constructor() {
    super()
    this._s = useTooltipRoot(this)
  }
}

interface TooltipRootElement extends TooltipRootProps {}

defineProperties(TooltipRootElement, defaultTooltipRootProps)

defineCustomElement('prosekit-tooltip-root', TooltipRootElement)

export { TooltipRootElement }

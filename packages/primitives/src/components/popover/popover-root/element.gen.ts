import { BaseElement, type SignalState } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'
import { defineProperties } from '../../../utils/define-properties'

import { defaultPopoverRootProps, type PopoverRootProps } from './props'
import { usePopoverRoot } from './state'

class PopoverRootElement extends BaseElement implements PopoverRootProps {
  readonly _s: SignalState<PopoverRootProps>

  constructor() {
    super()
    this._s = usePopoverRoot(this)
  }
}

interface PopoverRootElement extends PopoverRootProps {}

defineProperties(PopoverRootElement, defaultPopoverRootProps)

defineCustomElement('prosekit-popover-root-v2', PopoverRootElement)

export { PopoverRootElement }

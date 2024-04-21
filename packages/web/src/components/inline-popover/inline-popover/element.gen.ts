import { BaseElement, type SignalState } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'
import { defineProperties } from '../../../utils/define-properties'

import { defaultInlinePopoverProps, type InlinePopoverProps } from './props'
import { useInlinePopover } from './state'

class InlinePopoverElement extends BaseElement implements InlinePopoverProps {
  readonly _s: SignalState<InlinePopoverProps>

  constructor() {
    super()
    this._s = useInlinePopover(this)
  }
}

interface InlinePopoverElement extends InlinePopoverProps {}

defineProperties(InlinePopoverElement, defaultInlinePopoverProps)

defineCustomElement('prosekit-inline-popover', InlinePopoverElement)

export { InlinePopoverElement }

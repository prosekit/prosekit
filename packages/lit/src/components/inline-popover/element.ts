import { BaseElement, type SignalState } from '@aria-ui/core'

import { defineCustomElement } from '../../utils/define-custom-element'
import { defineProperties } from '../../utils/define-properties'

import { defaultInlinePopoverProps, type InlinePopoverProps } from './props'
import { useInlinePopover } from './state'

class InlinePopover extends BaseElement implements InlinePopoverProps {
  readonly _s: SignalState<InlinePopoverProps>

  constructor(props?: Partial<InlinePopoverProps>) {
    super()
    this._s = useInlinePopover(this, props)
  }
}

interface InlinePopover extends InlinePopoverProps {}

defineProperties(InlinePopover, defaultInlinePopoverProps)

defineCustomElement('prosekit-inline-popover', InlinePopover)

export { InlinePopover }

import { BaseElement, type SignalState } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'
import { defineProperties } from '../../../utils/define-properties'

import { defaultBlockPopoverProps, type BlockPopoverProps } from './props'
import { useBlockPopover } from './state'

class BlockPopoverElement extends BaseElement implements BlockPopoverProps {
  readonly _s: SignalState<BlockPopoverProps>

  constructor() {
    super()
    this._s = useBlockPopover(this)
  }
}

interface BlockPopoverElement extends BlockPopoverProps {}

defineProperties(BlockPopoverElement, defaultBlockPopoverProps)

defineCustomElement('prosekit-block-popover-v2', BlockPopoverElement)

export { BlockPopoverElement }

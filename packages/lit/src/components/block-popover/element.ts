import { BaseElement, type SignalState } from '@aria-ui/core'

import { defineCustomElement } from '../../utils/define-custom-element'
import { defineProperties } from '../../utils/define-properties'

import { defaultBlockPopoverProps, type BlockPopoverProps } from './props'
import { useBlockPopover } from './state'

class BlockPopover extends BaseElement implements BlockPopoverProps {
  readonly _s: SignalState<BlockPopoverProps>

  constructor(props?: Partial<BlockPopoverProps>) {
    super()
    this._s = useBlockPopover(this, props)
  }
}

interface BlockPopover extends BlockPopoverProps {}

defineProperties(BlockPopover, defaultBlockPopoverProps)

defineCustomElement('prosekit-block-popover', BlockPopover)

export { BlockPopover }

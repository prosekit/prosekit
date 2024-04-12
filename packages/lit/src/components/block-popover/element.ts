import { BaseElement, type SingalState } from '@aria-ui/core'

import { defineCustomElement } from '../../utils/define-custom-element'
import { defineProperties } from '../../utils/define-properties'

import { defaultBlockPopoverProps, type BlockPopoverProps } from './props'
import { useBlockPopover } from './state'

class BlockPopover extends BaseElement implements BlockPopoverProps {
  readonly _s: SingalState<BlockPopoverProps>

  constructor(props?: Partial<BlockPopoverProps>) {
    super()
    this._s = useBlockPopover(this, props)
  }
}

interface BlockPopover extends BlockPopoverProps {}

defineProperties(BlockPopover, defaultBlockPopoverProps)

defineCustomElement('prosekit-block-positioner', BlockPopover)

export { BlockPopover }

import { BaseElement, type SignalState } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'
import { defineProperties } from '../../../utils/define-properties'

import { defaultBlockDragHandleProps, type BlockDragHandleProps } from './props'
import { useBlockDragHandle } from './state'

class BlockDragHandleElement extends BaseElement implements BlockDragHandleProps {
  readonly _s: SignalState<BlockDragHandleProps>

  constructor() {
    super()
    this._s = useBlockDragHandle(this)
  }
}

interface BlockDragHandleElement extends BlockDragHandleProps {}

defineProperties(BlockDragHandleElement, defaultBlockDragHandleProps)

defineCustomElement('prosekit-block-drag-handle-v2', BlockDragHandleElement)

export { BlockDragHandleElement }

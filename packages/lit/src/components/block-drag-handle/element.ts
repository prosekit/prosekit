import { BaseElement, type SingalState } from '@aria-ui/core'

import { defineCustomElement } from '../../utils/define-custom-element'
import { defineProperties } from '../../utils/define-properties'

import { defaultBlockDragHandleProps, type BlockDragHandleProps } from './props'
import { useBlockDragHandle } from './state'

class BlockDragHandle extends BaseElement implements BlockDragHandleProps {
  readonly _s: SingalState<BlockDragHandleProps>

  constructor(props?: Partial<BlockDragHandleProps>) {
    super()
    this._s = useBlockDragHandle(this, props)
  }
}

interface BlockDragHandle extends BlockDragHandleProps {}

defineProperties(BlockDragHandle, defaultBlockDragHandleProps)

defineCustomElement('prosekit-block-drag-handle', BlockDragHandle)

export { BlockDragHandle }

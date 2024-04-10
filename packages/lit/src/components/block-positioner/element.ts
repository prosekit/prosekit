import { BaseElement, type SingalState } from '@aria-ui/core'

import { defineCustomElement } from '../../utils/define-custom-element'
import { defineProperties } from '../../utils/define-properties'

import { defaultBlockPositionerProps, type BlockPositionerProps } from './props'
import { useBlockPositioner } from './state'

class BlockPositioner extends BaseElement implements BlockPositionerProps {
  readonly _s: SingalState<BlockPositionerProps>

  constructor(props?: Partial<BlockPositionerProps>) {
    super()
    this._s = useBlockPositioner(this, props)
  }
}

interface BlockPositioner extends BlockPositionerProps {}

defineProperties(BlockPositioner, defaultBlockPositionerProps)

defineCustomElement('prosekit-block-positioner', BlockPositioner)

export { BlockPositioner }

import { ElementBuilder } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultBlockDragHandleProps, type BlockDragHandleProps } from './props'
import { useBlockDragHandle } from './state'

class BlockDragHandleElement extends ElementBuilder<BlockDragHandleProps>(useBlockDragHandle, defaultBlockDragHandleProps) {}

defineCustomElement('prosekit-block-drag-handle', BlockDragHandleElement)

export { BlockDragHandleElement }

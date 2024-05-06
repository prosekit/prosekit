import { ElementMixin } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultBlockDragHandleProps, type BlockDragHandleProps } from './props'
import { useBlockDragHandle } from './state'

class BlockDragHandleElement extends ElementMixin<BlockDragHandleProps>(useBlockDragHandle, defaultBlockDragHandleProps) {}

defineCustomElement('prosekit-block-drag-handle', BlockDragHandleElement)

export { BlockDragHandleElement }

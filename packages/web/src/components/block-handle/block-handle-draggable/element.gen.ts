import { ElementBuilder } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultBlockHandleDraggableProps, type BlockHandleDraggableProps } from './props'
import { useBlockHandleDraggable } from './state'

class BlockHandleDraggableElement extends ElementBuilder<BlockHandleDraggableProps>(useBlockHandleDraggable, defaultBlockHandleDraggableProps) {}

defineCustomElement('prosekit-block-handle-draggable', BlockHandleDraggableElement)

export { BlockHandleDraggableElement }

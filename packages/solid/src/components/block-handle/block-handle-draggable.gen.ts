import { 
  blockHandleDraggableProps,
  blockHandleDraggableEvents,
  type BlockHandleDraggableElement,
  type BlockHandleDraggableProps,
} from '@prosekit/web/block-handle'

import { createComponent } from '../create-component'

export const BlockHandleDraggable = createComponent<
  BlockHandleDraggableProps,
  BlockHandleDraggableElement
>(
  'prosekit-block-handle-draggable', 
  Object.keys(blockHandleDraggableProps),
  Object.keys(blockHandleDraggableEvents),
)

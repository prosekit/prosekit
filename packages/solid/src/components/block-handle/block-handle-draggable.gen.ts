import { 
  defaultBlockHandleDraggableProps,
  type BlockHandleDraggableElement,
  type BlockHandleDraggableProps,
} from '@prosekit/web/block-handle'

import { createComponent } from '../create-component'

export const BlockHandleDraggable = createComponent<
  BlockHandleDraggableProps,
  BlockHandleDraggableElement
>(
  'prosekit-block-handle-draggable', 
  defaultBlockHandleDraggableProps,
)

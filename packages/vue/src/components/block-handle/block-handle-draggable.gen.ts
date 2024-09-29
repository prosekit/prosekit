import { blockHandleDraggableProps, blockHandleDraggableEvents, type BlockHandleDraggableProps, type BlockHandleDraggableEvents } from '@prosekit/web/block-handle'

import { createComponent } from '../create-component'

export const BlockHandleDraggable = createComponent<
  BlockHandleDraggableProps,
  BlockHandleDraggableEvents
>(
  'prosekit-block-handle-draggable',
  'BlockHandleDraggable',
  Object.keys(blockHandleDraggableProps),
  Object.keys(blockHandleDraggableEvents),
)

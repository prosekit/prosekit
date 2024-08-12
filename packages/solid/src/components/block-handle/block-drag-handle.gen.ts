import { 
  BlockDragHandleElement,
  defaultBlockDragHandleProps,
  type BlockDragHandleProps,
} from '@prosekit/web/block-handle'

import { createComponent } from '../create-component'

export const BlockDragHandle = createComponent<
  BlockDragHandleProps,
  BlockDragHandleElement
>(
  'prosekit-block-drag-handle', 
  defaultBlockDragHandleProps,
)

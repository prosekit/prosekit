import { defaultBlockDragHandleProps, type BlockDragHandleProps } from '@prosekit/web/block-handle'

import { createComponent } from '../create-component'

export const BlockDragHandle = createComponent<BlockDragHandleProps>('prosekit-block-drag-handle', 'BlockDragHandle', defaultBlockDragHandleProps)

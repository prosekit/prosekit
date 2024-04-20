import {
  BlockDragHandleElement,
  defaultBlockDragHandleProps,
  type BlockDragHandleProps,
} from '@prosekit/primitives/block-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'

export const BlockDragHandle: ForwardRefExoticComponent<
  Partial<BlockDragHandleProps> &
  RefAttributes<BlockDragHandleElement> &
  HTMLAttributes<BlockDragHandleElement>
> = createComponent<
  BlockDragHandleProps, 
  BlockDragHandleElement
>(
  'prosekit-block-drag-handle',
  'BlockDragHandle',
  defaultBlockDragHandleProps,
)

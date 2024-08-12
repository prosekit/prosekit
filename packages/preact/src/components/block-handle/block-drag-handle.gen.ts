import {
  defaultBlockDragHandleProps,
  type BlockDragHandleElement,
  type BlockDragHandleProps,
} from '@prosekit/web/block-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

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

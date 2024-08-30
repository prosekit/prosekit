import {
  defaultBlockHandleDraggableProps,
  type BlockHandleDraggableElement,
  type BlockHandleDraggableProps,
} from '@prosekit/web/block-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component'

export const BlockHandleDraggable: ForwardRefExoticComponent<
  Partial<BlockHandleDraggableProps> &
  RefAttributes<BlockHandleDraggableElement> &
  HTMLAttributes<BlockHandleDraggableElement>
> = createComponent<
  BlockHandleDraggableProps, 
  BlockHandleDraggableElement
>(
  'prosekit-block-handle-draggable',
  'BlockHandleDraggable',
  defaultBlockHandleDraggableProps,
)

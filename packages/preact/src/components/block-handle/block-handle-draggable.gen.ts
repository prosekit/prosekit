import {
  type BlockHandleDraggableElement,
  type BlockHandleDraggableProps as Props,
  type BlockHandleDraggableEvents as Events,
  blockHandleDraggableProps,
  blockHandleDraggableEvents,
} from '@prosekit/web/block-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

export type BlockHandleDraggableProps = CreateProps<Props, Events>
 
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
  Object.keys(blockHandleDraggableProps),
  Object.keys(blockHandleDraggableEvents),
)

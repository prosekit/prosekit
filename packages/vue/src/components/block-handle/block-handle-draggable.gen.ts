import {
  blockHandleDraggableProps,
  blockHandleDraggableEvents,
  type BlockHandleDraggableProps as Props,
  type BlockHandleDraggableEvents as Events,
} from '@prosekit/web/block-handle'

import { createComponent } from '../create-component'

/**
 * Props for the {@link BlockHandleDraggable} component.
 */
export interface BlockHandleDraggableProps extends Partial<Props> {}

/**
 * Events for the {@link BlockHandleDraggable} component.
 */
export interface BlockHandleDraggableEvents extends Partial<Events> {}

export const BlockHandleDraggable = createComponent<
  BlockHandleDraggableProps,
  BlockHandleDraggableEvents
>(
  'prosekit-block-handle-draggable',
  'BlockHandleDraggable',
  Object.keys(blockHandleDraggableProps),
  Object.keys(blockHandleDraggableEvents),
)

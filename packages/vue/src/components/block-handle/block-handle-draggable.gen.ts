import {
  blockHandleDraggableProps,
  blockHandleDraggableEvents,
  type BlockHandleDraggableProps as Props,
  type BlockHandleDraggableEvents as Events,
} from '@prosekit/web/block-handle'
import type { DefineSetupFnComponent, HTMLAttributes } from 'vue'

import { createComponent } from '../create-component.ts'
import type { CreateEmits } from '../create-emits.ts'

/**
 * Props for the {@link BlockHandleDraggable} component.
 */
export interface BlockHandleDraggableProps extends Partial<Props> {}

/**
 * Emits for the {@link BlockHandleDraggable} component.
 */
export interface BlockHandleDraggableEmits extends CreateEmits<Events> {}

export const BlockHandleDraggable: DefineSetupFnComponent<
  BlockHandleDraggableProps & HTMLAttributes,
  BlockHandleDraggableEmits
> = createComponent<
  BlockHandleDraggableProps,
  BlockHandleDraggableEmits
>(
  'prosekit-block-handle-draggable',
  'BlockHandleDraggable',
  Object.keys(blockHandleDraggableProps),
  Object.keys(blockHandleDraggableEvents),
)

import { 
  type BlockHandleDraggableElement,
  type BlockHandleDraggableProps as Props,
  type BlockHandleDraggableEvents as Events,
  blockHandleDraggableProps,
  blockHandleDraggableEvents,
} from '@prosekit/web/block-handle'
import type { Component } from 'solid-js'

import type { PropsWithElement } from '../../types'
import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link BlockHandleDraggable} component.
 */
export interface BlockHandleDraggableProps extends Partial<CreateProps<Props, Events>> {}

export const BlockHandleDraggable: Component<PropsWithElement<
  BlockHandleDraggableProps,
  BlockHandleDraggableElement
>> = createComponent<
  BlockHandleDraggableProps,
  BlockHandleDraggableElement
>(
  'prosekit-block-handle-draggable', 
  Object.keys(blockHandleDraggableProps),
  Object.keys(blockHandleDraggableEvents),
)

import { 
  type BlockHandleAddElement,
  type BlockHandleAddProps as Props,
  type BlockHandleAddEvents as Events,
  blockHandleAddProps,
  blockHandleAddEvents,
} from '@prosekit/web/block-handle'
import type { Component } from 'solid-js'

import type { PropsWithElement } from '../../types'
import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link BlockHandleAdd} component.
 */
export interface BlockHandleAddProps extends Partial<CreateProps<Props, Events>> {}

export const BlockHandleAdd: Component<PropsWithElement<
  BlockHandleAddProps,
  BlockHandleAddElement
>> = createComponent<
  BlockHandleAddProps,
  BlockHandleAddElement
>(
  'prosekit-block-handle-add', 
  Object.keys(blockHandleAddProps),
  Object.keys(blockHandleAddEvents),
)

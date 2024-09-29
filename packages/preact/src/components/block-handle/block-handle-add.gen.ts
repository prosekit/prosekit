import {
  type BlockHandleAddElement,
  type BlockHandleAddProps as Props,
  type BlockHandleAddEvents as Events,
  blockHandleAddProps,
  blockHandleAddEvents,
} from '@prosekit/web/block-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

export type BlockHandleAddProps = CreateProps<Props, Events>
 
export const BlockHandleAdd: ForwardRefExoticComponent<
  Partial<BlockHandleAddProps> &
  RefAttributes<BlockHandleAddElement> &
  HTMLAttributes<BlockHandleAddElement>
> = createComponent<
  BlockHandleAddProps, 
  BlockHandleAddElement
>(
  'prosekit-block-handle-add',
  'BlockHandleAdd',
  Object.keys(blockHandleAddProps),
  Object.keys(blockHandleAddEvents),
)

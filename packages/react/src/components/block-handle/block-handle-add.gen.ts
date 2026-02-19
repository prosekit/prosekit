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
} from 'react'

import { createComponent } from '../create-component.ts'
import type { CreateProps } from '../create-props.ts'

/**
 * Props for the {@link BlockHandleAdd} component.
 */
export interface BlockHandleAddProps extends Partial<CreateProps<Props, Events>> {}

export const BlockHandleAdd: ForwardRefExoticComponent<
  BlockHandleAddProps &
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

import {
  defaultBlockHandleAddProps,
  type BlockHandleAddElement,
  type BlockHandleAddProps
} from '@prosekit/web/block-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'

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
  defaultBlockHandleAddProps,
)

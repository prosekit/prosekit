import { 
  blockHandleAddProps,
  blockHandleAddEvents,
  type BlockHandleAddElement,
  type BlockHandleAddProps,
} from '@prosekit/web/block-handle'

import { createComponent } from '../create-component'

export const BlockHandleAdd = createComponent<
  BlockHandleAddProps,
  BlockHandleAddElement
>(
  'prosekit-block-handle-add', 
  Object.keys(blockHandleAddProps),
  Object.keys(blockHandleAddEvents),
)

import { 
  defaultBlockHandleAddProps,
  type BlockHandleAddElement,
  type BlockHandleAddProps,
} from '@prosekit/web/block-handle'

import { createComponent } from '../create-component'

export const BlockHandleAdd = createComponent<
  BlockHandleAddProps,
  BlockHandleAddElement
>(
  'prosekit-block-handle-add', 
  defaultBlockHandleAddProps,
)

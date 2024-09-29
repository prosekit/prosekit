import { blockHandleAddProps, blockHandleAddEvents, type BlockHandleAddProps, type BlockHandleAddEvents } from '@prosekit/web/block-handle'

import { createComponent } from '../create-component'

export const BlockHandleAdd = createComponent<
  BlockHandleAddProps,
  BlockHandleAddEvents
>(
  'prosekit-block-handle-add',
  'BlockHandleAdd',
  Object.keys(blockHandleAddProps),
  Object.keys(blockHandleAddEvents),
)

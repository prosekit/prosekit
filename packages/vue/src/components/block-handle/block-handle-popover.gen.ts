import { blockHandlePopoverProps, blockHandlePopoverEvents, type BlockHandlePopoverProps, type BlockHandlePopoverEvents } from '@prosekit/web/block-handle'

import { createComponent } from '../create-component'

export const BlockHandlePopover = createComponent<
  BlockHandlePopoverProps,
  BlockHandlePopoverEvents
>(
  'prosekit-block-handle-popover',
  'BlockHandlePopover',
  Object.keys(blockHandlePopoverProps),
  Object.keys(blockHandlePopoverEvents),
)

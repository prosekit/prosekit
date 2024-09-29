import { 
  blockHandlePopoverProps,
  blockHandlePopoverEvents,
  type BlockHandlePopoverElement,
  type BlockHandlePopoverProps,
} from '@prosekit/web/block-handle'

import { createComponent } from '../create-component'

export const BlockHandlePopover = createComponent<
  BlockHandlePopoverProps,
  BlockHandlePopoverElement
>(
  'prosekit-block-handle-popover', 
  Object.keys(blockHandlePopoverProps),
  Object.keys(blockHandlePopoverEvents),
)

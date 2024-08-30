import { 
  defaultBlockHandlePopoverProps,
  type BlockHandlePopoverElement,
  type BlockHandlePopoverProps,
} from '@prosekit/web/block-handle'

import { createComponent } from '../create-component'

export const BlockHandlePopover = createComponent<
  BlockHandlePopoverProps,
  BlockHandlePopoverElement
>(
  'prosekit-block-handle-popover', 
  defaultBlockHandlePopoverProps,
)

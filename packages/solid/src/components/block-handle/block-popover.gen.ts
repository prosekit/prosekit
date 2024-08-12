import { 
  defaultBlockPopoverProps,
  type BlockPopoverElement,
  type BlockPopoverProps,
} from '@prosekit/web/block-handle'

import { createComponent } from '../create-component'

export const BlockPopover = createComponent<
  BlockPopoverProps,
  BlockPopoverElement
>(
  'prosekit-block-popover', 
  defaultBlockPopoverProps,
)

import { 
  BlockPopoverElement,
  defaultBlockPopoverProps,
  type BlockPopoverProps,
} from '@prosekit/primitives/block-handle'

import { createComponent } from '../create-component'

export const BlockPopover = createComponent<
  BlockPopoverProps,
  BlockPopoverElement
>(
  'prosekit-block-popover', 
  'BlockPopover',
  defaultBlockPopoverProps,
)

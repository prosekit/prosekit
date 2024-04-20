import '@prosekit/primitives/block-handle'

import type { 
  BlockPopoverElement,
  BlockPopoverProps,
} from '@prosekit/primitives/block-handle'

import { createComponent } from '../create-component'

export const BlockPopover = createComponent<
  BlockPopoverProps,
  BlockPopoverElement
>(
  'prosekit-block-popover', 
  'BlockPopover',
)

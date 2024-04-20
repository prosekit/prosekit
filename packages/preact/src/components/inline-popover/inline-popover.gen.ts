import '@prosekit/primitives/inline-popover'

import type { 
  InlinePopoverElement,
  InlinePopoverProps,
} from '@prosekit/primitives/inline-popover'

import { createComponent } from '../create-component'

export const InlinePopover = createComponent<
  InlinePopoverProps,
  InlinePopoverElement
>(
  'prosekit-inline-popover', 
  'InlinePopover',
)

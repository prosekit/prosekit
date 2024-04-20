import { 
  InlinePopoverElement,
  defaultInlinePopoverProps,
  type InlinePopoverProps,
} from '@prosekit/primitives/inline-popover'

import { createComponent } from '../create-component'

export const InlinePopover = createComponent<
  InlinePopoverProps,
  InlinePopoverElement
>(
  'prosekit-inline-popover', 
  'InlinePopover',
  defaultInlinePopoverProps,
)

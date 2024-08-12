import { 
  InlinePopoverElement,
  defaultInlinePopoverProps,
  type InlinePopoverProps,
} from '@prosekit/web/inline-popover'

import { createComponent } from '../create-component'

export const InlinePopover = createComponent<
  InlinePopoverProps,
  InlinePopoverElement
>(
  'prosekit-inline-popover', 
  defaultInlinePopoverProps,
)

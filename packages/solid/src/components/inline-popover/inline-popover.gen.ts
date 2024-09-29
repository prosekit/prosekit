import { 
  inlinePopoverProps,
  inlinePopoverEvents,
  type InlinePopoverElement,
  type InlinePopoverProps,
} from '@prosekit/web/inline-popover'

import { createComponent } from '../create-component'

export const InlinePopover = createComponent<
  InlinePopoverProps,
  InlinePopoverElement
>(
  'prosekit-inline-popover', 
  Object.keys(inlinePopoverProps),
  Object.keys(inlinePopoverEvents),
)

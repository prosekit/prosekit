import { inlinePopoverProps, inlinePopoverEvents, type InlinePopoverProps, type InlinePopoverEvents } from '@prosekit/web/inline-popover'

import { createComponent } from '../create-component'

export const InlinePopover = createComponent<
  InlinePopoverProps,
  InlinePopoverEvents
>(
  'prosekit-inline-popover',
  'InlinePopover',
  Object.keys(inlinePopoverProps),
  Object.keys(inlinePopoverEvents),
)

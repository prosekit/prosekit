import { popoverContentProps, popoverContentEvents, type PopoverContentProps, type PopoverContentEvents } from '@prosekit/web/popover'

import { createComponent } from '../create-component'

export const PopoverContent = createComponent<
  PopoverContentProps,
  PopoverContentEvents
>(
  'prosekit-popover-content',
  'PopoverContent',
  Object.keys(popoverContentProps),
  Object.keys(popoverContentEvents),
)

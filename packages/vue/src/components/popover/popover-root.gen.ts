import { popoverRootProps, popoverRootEvents, type PopoverRootProps, type PopoverRootEvents } from '@prosekit/web/popover'

import { createComponent } from '../create-component'

export const PopoverRoot = createComponent<
  PopoverRootProps,
  PopoverRootEvents
>(
  'prosekit-popover-root',
  'PopoverRoot',
  Object.keys(popoverRootProps),
  Object.keys(popoverRootEvents),
)

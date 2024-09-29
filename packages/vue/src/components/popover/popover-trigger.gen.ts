import { popoverTriggerProps, popoverTriggerEvents, type PopoverTriggerProps, type PopoverTriggerEvents } from '@prosekit/web/popover'

import { createComponent } from '../create-component'

export const PopoverTrigger = createComponent<
  PopoverTriggerProps,
  PopoverTriggerEvents
>(
  'prosekit-popover-trigger',
  'PopoverTrigger',
  Object.keys(popoverTriggerProps),
  Object.keys(popoverTriggerEvents),
)

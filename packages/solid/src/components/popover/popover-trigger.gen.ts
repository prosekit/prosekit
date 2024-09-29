import { 
  popoverTriggerProps,
  popoverTriggerEvents,
  type PopoverTriggerElement,
  type PopoverTriggerProps,
} from '@prosekit/web/popover'

import { createComponent } from '../create-component'

export const PopoverTrigger = createComponent<
  PopoverTriggerProps,
  PopoverTriggerElement
>(
  'prosekit-popover-trigger', 
  Object.keys(popoverTriggerProps),
  Object.keys(popoverTriggerEvents),
)

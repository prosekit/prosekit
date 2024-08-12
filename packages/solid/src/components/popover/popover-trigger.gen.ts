import { 
  defaultPopoverTriggerProps,
  type PopoverTriggerElement,
  type PopoverTriggerProps,
} from '@prosekit/web/popover'

import { createComponent } from '../create-component'

export const PopoverTrigger = createComponent<
  PopoverTriggerProps,
  PopoverTriggerElement
>(
  'prosekit-popover-trigger', 
  defaultPopoverTriggerProps,
)

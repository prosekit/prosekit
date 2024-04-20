import { 
  PopoverTriggerElement,
  defaultPopoverTriggerProps,
  type PopoverTriggerProps,
} from '@prosekit/primitives/popover'

import { createComponent } from '../create-component'

export const PopoverTrigger = createComponent<
  PopoverTriggerProps,
  PopoverTriggerElement
>(
  'prosekit-popover-trigger', 
  'PopoverTrigger',
  defaultPopoverTriggerProps,
)

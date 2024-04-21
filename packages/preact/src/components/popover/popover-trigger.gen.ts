import '@prosekit/web/popover'

import type { 
  PopoverTriggerElement,
  PopoverTriggerProps,
} from '@prosekit/web/popover'

import { createComponent } from '../create-component'

export const PopoverTrigger = createComponent<
  PopoverTriggerProps,
  PopoverTriggerElement
>(
  'prosekit-popover-trigger', 
  'PopoverTrigger',
)

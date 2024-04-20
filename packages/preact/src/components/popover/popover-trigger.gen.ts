import '@prosekit/primitives/popover'

import type { 
  PopoverTriggerElement,
  PopoverTriggerProps,
} from '@prosekit/primitives/popover'

import { createComponent } from '../create-component'

export const PopoverTrigger = createComponent<
  PopoverTriggerProps,
  PopoverTriggerElement
>(
  'prosekit-popover-trigger', 
  'PopoverTrigger',
)

import '@prosekit/primitives/popover'

import type { 
  PopoverContentElement,
  PopoverContentProps,
} from '@prosekit/primitives/popover'

import { createComponent } from '../create-component'

export const PopoverContent = createComponent<
  PopoverContentProps,
  PopoverContentElement
>(
  'prosekit-popover-content', 
  'PopoverContent',
)

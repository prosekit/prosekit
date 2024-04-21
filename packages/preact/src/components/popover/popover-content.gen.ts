import '@prosekit/web/popover'

import type { 
  PopoverContentElement,
  PopoverContentProps,
} from '@prosekit/web/popover'

import { createComponent } from '../create-component'

export const PopoverContent = createComponent<
  PopoverContentProps,
  PopoverContentElement
>(
  'prosekit-popover-content', 
  'PopoverContent',
)

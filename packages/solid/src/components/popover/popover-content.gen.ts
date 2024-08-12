import { 
  defaultPopoverContentProps,
  type PopoverContentElement,
  type PopoverContentProps,
} from '@prosekit/web/popover'

import { createComponent } from '../create-component'

export const PopoverContent = createComponent<
  PopoverContentProps,
  PopoverContentElement
>(
  'prosekit-popover-content', 
  defaultPopoverContentProps,
)

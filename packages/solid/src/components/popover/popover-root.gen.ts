import { 
  PopoverRootElement,
  defaultPopoverRootProps,
  type PopoverRootProps,
} from '@prosekit/primitives/popover'

import { createComponent } from '../create-component'

export const PopoverRoot = createComponent<
  PopoverRootProps,
  PopoverRootElement
>(
  'prosekit-popover-root', 
  'PopoverRoot',
  defaultPopoverRootProps,
)

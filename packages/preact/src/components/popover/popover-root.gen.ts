import '@prosekit/web/popover'

import type { 
  PopoverRootElement,
  PopoverRootProps,
} from '@prosekit/web/popover'

import { createComponent } from '../create-component'

export const PopoverRoot = createComponent<
  PopoverRootProps,
  PopoverRootElement
>(
  'prosekit-popover-root', 
  'PopoverRoot',
)

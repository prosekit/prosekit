import '@prosekit/primitives/tooltip'

import type { 
  TooltipContentElement,
  TooltipContentProps,
} from '@prosekit/primitives/tooltip'

import { createComponent } from '../create-component'

export const TooltipContent = createComponent<
  TooltipContentProps,
  TooltipContentElement
>(
  'prosekit-tooltip-content', 
  'TooltipContent',
)

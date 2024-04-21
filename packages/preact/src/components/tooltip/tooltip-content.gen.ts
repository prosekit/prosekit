import '@prosekit/web/tooltip'

import type { 
  TooltipContentElement,
  TooltipContentProps,
} from '@prosekit/web/tooltip'

import { createComponent } from '../create-component'

export const TooltipContent = createComponent<
  TooltipContentProps,
  TooltipContentElement
>(
  'prosekit-tooltip-content', 
  'TooltipContent',
)

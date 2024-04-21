import { 
  TooltipContentElement,
  defaultTooltipContentProps,
  type TooltipContentProps,
} from '@prosekit/web/tooltip'

import { createComponent } from '../create-component'

export const TooltipContent = createComponent<
  TooltipContentProps,
  TooltipContentElement
>(
  'prosekit-tooltip-content', 
  defaultTooltipContentProps,
)

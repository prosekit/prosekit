import { 
  tooltipContentProps,
  tooltipContentEvents,
  type TooltipContentElement,
  type TooltipContentProps,
} from '@prosekit/web/tooltip'

import { createComponent } from '../create-component'

export const TooltipContent = createComponent<
  TooltipContentProps,
  TooltipContentElement
>(
  'prosekit-tooltip-content', 
  Object.keys(tooltipContentProps),
  Object.keys(tooltipContentEvents),
)

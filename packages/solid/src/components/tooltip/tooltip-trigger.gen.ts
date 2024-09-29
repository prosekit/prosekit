import { 
  tooltipTriggerProps,
  tooltipTriggerEvents,
  type TooltipTriggerElement,
  type TooltipTriggerProps,
} from '@prosekit/web/tooltip'

import { createComponent } from '../create-component'

export const TooltipTrigger = createComponent<
  TooltipTriggerProps,
  TooltipTriggerElement
>(
  'prosekit-tooltip-trigger', 
  Object.keys(tooltipTriggerProps),
  Object.keys(tooltipTriggerEvents),
)

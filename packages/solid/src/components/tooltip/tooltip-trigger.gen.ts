import { 
  defaultTooltipTriggerProps,
  type TooltipTriggerElement,
  type TooltipTriggerProps,
} from '@prosekit/web/tooltip'

import { createComponent } from '../create-component'

export const TooltipTrigger = createComponent<
  TooltipTriggerProps,
  TooltipTriggerElement
>(
  'prosekit-tooltip-trigger', 
  defaultTooltipTriggerProps,
)

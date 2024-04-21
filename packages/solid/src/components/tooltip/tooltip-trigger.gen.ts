import { 
  TooltipTriggerElement,
  defaultTooltipTriggerProps,
  type TooltipTriggerProps,
} from '@prosekit/web/tooltip'

import { createComponent } from '../create-component'

export const TooltipTrigger = createComponent<
  TooltipTriggerProps,
  TooltipTriggerElement
>(
  'prosekit-tooltip-trigger', 
  'TooltipTrigger',
  defaultTooltipTriggerProps,
)

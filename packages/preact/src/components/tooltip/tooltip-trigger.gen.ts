import '@prosekit/primitives/tooltip'

import type { 
  TooltipTriggerElement,
  TooltipTriggerProps,
} from '@prosekit/primitives/tooltip'

import { createComponent } from '../create-component'

export const TooltipTrigger = createComponent<
  TooltipTriggerProps,
  TooltipTriggerElement
>(
  'prosekit-tooltip-trigger', 
  'TooltipTrigger',
)

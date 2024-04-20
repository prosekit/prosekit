import {
  TooltipTriggerElement,
  defaultTooltipTriggerProps,
  type TooltipTriggerProps,
} from '@prosekit/primitives/tooltip'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'

export const TooltipTrigger: ForwardRefExoticComponent<
  Partial<TooltipTriggerProps> &
  RefAttributes<TooltipTriggerElement> &
  HTMLAttributes<TooltipTriggerElement>
> = createComponent<
  TooltipTriggerProps, 
  TooltipTriggerElement
>(
  'prosekit-tooltip-trigger',
  'TooltipTrigger',
  defaultTooltipTriggerProps,
)

import {
  defaultTooltipTriggerProps,
  type TooltipTriggerElement,
  type TooltipTriggerProps,
} from '@prosekit/web/tooltip'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

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

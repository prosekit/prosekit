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
  RefAttributes<TooltipTriggerElement> &
    TooltipTriggerProps &
    HTMLAttributes<TooltipTriggerElement>
> = createComponent<TooltipTriggerProps, TooltipTriggerElement>(
  'tooltip-trigger-v2',
  'TooltipTrigger',
  defaultTooltipTriggerProps,
)

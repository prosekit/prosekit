import {
  TooltipTriggerElement,
  defaultTooltipTriggerProps,
  type TooltipTriggerProps,
} from '@prosekit/primitives/tooltip'
import {
  type ForwardRefExoticComponent,
  type HTMLAttributes,
  type RefAttributes,
} from 'react'

import { createComponent } from './create-component'

export const TooltipTrigger: ForwardRefExoticComponent<
  RefAttributes<TooltipTriggerElement> &
    TooltipTriggerProps &
    HTMLAttributes<TooltipTriggerElement>
> = createComponent<TooltipTriggerProps, TooltipTriggerElement>(
  'prosekit-tooltip-trigger-v2',
  'TooltipTrigger',
  defaultTooltipTriggerProps,
)

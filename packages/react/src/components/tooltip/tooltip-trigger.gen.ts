import {
  type TooltipTriggerElement,
  type TooltipTriggerProps as Props,
  type TooltipTriggerEvents as Events,
  tooltipTriggerProps,
  tooltipTriggerEvents,
} from '@prosekit/web/tooltip'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link TooltipTrigger} component.
 */
export interface TooltipTriggerProps extends Partial<CreateProps<Props, Events>> {}
 
export const TooltipTrigger: ForwardRefExoticComponent<
  TooltipTriggerProps &
  RefAttributes<TooltipTriggerElement> &
  HTMLAttributes<TooltipTriggerElement>
> = createComponent<
  TooltipTriggerProps, 
  TooltipTriggerElement
>(
  'prosekit-tooltip-trigger',
  'TooltipTrigger',
  Object.keys(tooltipTriggerProps),
  Object.keys(tooltipTriggerEvents),
)

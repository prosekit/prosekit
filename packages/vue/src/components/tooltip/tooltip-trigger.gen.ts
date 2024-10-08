import {
  tooltipTriggerProps,
  tooltipTriggerEvents,
  type TooltipTriggerProps as Props,
  type TooltipTriggerEvents as Events,
} from '@prosekit/web/tooltip'

import { createComponent } from '../create-component'

/**
 * Props for the {@link TooltipTrigger} component.
 */
export interface TooltipTriggerProps extends Partial<Props> {}

/**
 * Events for the {@link TooltipTrigger} component.
 */
export interface TooltipTriggerEvents extends Partial<Events> {}

export const TooltipTrigger = createComponent<
  TooltipTriggerProps,
  TooltipTriggerEvents
>(
  'prosekit-tooltip-trigger',
  'TooltipTrigger',
  Object.keys(tooltipTriggerProps),
  Object.keys(tooltipTriggerEvents),
)

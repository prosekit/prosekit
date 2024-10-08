import {
  tooltipContentProps,
  tooltipContentEvents,
  type TooltipContentProps as Props,
  type TooltipContentEvents as Events,
} from '@prosekit/web/tooltip'

import { createComponent } from '../create-component'

/**
 * Props for the {@link TooltipContent} component.
 */
export interface TooltipContentProps extends Partial<Props> {}

/**
 * Events for the {@link TooltipContent} component.
 */
export interface TooltipContentEvents extends Partial<Events> {}

export const TooltipContent = createComponent<
  TooltipContentProps,
  TooltipContentEvents
>(
  'prosekit-tooltip-content',
  'TooltipContent',
  Object.keys(tooltipContentProps),
  Object.keys(tooltipContentEvents),
)

import {
  tooltipRootProps,
  tooltipRootEvents,
  type TooltipRootProps as Props,
  type TooltipRootEvents as Events,
} from '@prosekit/web/tooltip'

import { createComponent } from '../create-component'

/**
 * Props for the {@link TooltipRoot} component.
 */
export interface TooltipRootProps extends Partial<Props> {}

/**
 * Events for the {@link TooltipRoot} component.
 */
export interface TooltipRootEvents extends Partial<Events> {}

export const TooltipRoot = createComponent<
  TooltipRootProps,
  TooltipRootEvents
>(
  'prosekit-tooltip-root',
  'TooltipRoot',
  Object.keys(tooltipRootProps),
  Object.keys(tooltipRootEvents),
)

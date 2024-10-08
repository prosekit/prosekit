import { 
  type TooltipRootElement,
  type TooltipRootProps as Props,
  type TooltipRootEvents as Events,
  tooltipRootProps,
  tooltipRootEvents,
} from '@prosekit/web/tooltip'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link TooltipRoot} component.
 */
export interface TooltipRootProps extends Partial<CreateProps<Props, Events>> {}

export const TooltipRoot = createComponent<
  TooltipRootProps,
  TooltipRootElement
>(
  'prosekit-tooltip-root', 
  Object.keys(tooltipRootProps),
  Object.keys(tooltipRootEvents),
)

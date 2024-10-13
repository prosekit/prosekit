import { 
  type TooltipContentElement,
  type TooltipContentProps as Props,
  type TooltipContentEvents as Events,
  tooltipContentProps,
  tooltipContentEvents,
} from '@prosekit/web/tooltip'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link TooltipContent} component.
 */
export interface TooltipContentProps extends Partial<CreateProps<Props, Events>> {}

export const TooltipContent = createComponent<
  TooltipContentProps,
  TooltipContentElement
>(
  'prosekit-tooltip-content', 
  Object.keys(tooltipContentProps),
  Object.keys(tooltipContentEvents),
)

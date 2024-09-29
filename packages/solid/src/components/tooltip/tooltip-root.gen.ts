import { 
  tooltipRootProps,
  tooltipRootEvents,
  type TooltipRootElement,
  type TooltipRootProps,
} from '@prosekit/web/tooltip'

import { createComponent } from '../create-component'

export const TooltipRoot = createComponent<
  TooltipRootProps,
  TooltipRootElement
>(
  'prosekit-tooltip-root', 
  Object.keys(tooltipRootProps),
  Object.keys(tooltipRootEvents),
)

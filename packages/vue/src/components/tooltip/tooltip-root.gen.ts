import { tooltipRootProps, tooltipRootEvents, type TooltipRootProps, type TooltipRootEvents } from '@prosekit/web/tooltip'

import { createComponent } from '../create-component'

export const TooltipRoot = createComponent<
  TooltipRootProps,
  TooltipRootEvents
>(
  'prosekit-tooltip-root',
  'TooltipRoot',
  Object.keys(tooltipRootProps),
  Object.keys(tooltipRootEvents),
)

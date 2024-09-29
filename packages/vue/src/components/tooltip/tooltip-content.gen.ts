import { tooltipContentProps, tooltipContentEvents, type TooltipContentProps, type TooltipContentEvents } from '@prosekit/web/tooltip'

import { createComponent } from '../create-component'

export const TooltipContent = createComponent<
  TooltipContentProps,
  TooltipContentEvents
>(
  'prosekit-tooltip-content',
  'TooltipContent',
  Object.keys(tooltipContentProps),
  Object.keys(tooltipContentEvents),
)

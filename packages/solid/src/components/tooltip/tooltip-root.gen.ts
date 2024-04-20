import { 
  TooltipRootElement,
  defaultTooltipRootProps,
  type TooltipRootProps,
} from '@prosekit/primitives/tooltip'

import { createComponent } from '../create-component'

export const TooltipRoot = createComponent<
  TooltipRootProps,
  TooltipRootElement
>(
  'prosekit-tooltip-root', 
  'TooltipRoot',
  defaultTooltipRootProps,
)

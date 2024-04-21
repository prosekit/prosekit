import '@prosekit/web/tooltip'

import type { 
  TooltipRootElement,
  TooltipRootProps,
} from '@prosekit/web/tooltip'

import { createComponent } from '../create-component'

export const TooltipRoot = createComponent<
  TooltipRootProps,
  TooltipRootElement
>(
  'prosekit-tooltip-root', 
  'TooltipRoot',
)

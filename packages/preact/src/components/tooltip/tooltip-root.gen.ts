import '@prosekit/primitives/tooltip'

import type { 
  TooltipRootElement,
  TooltipRootProps,
} from '@prosekit/primitives/tooltip'

import { createComponent } from '../create-component'

export const TooltipRoot = createComponent<
  TooltipRootProps,
  TooltipRootElement
>(
  'prosekit-tooltip-root', 
  'TooltipRoot',
)

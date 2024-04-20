import {
  defaultTooltipContentProps,
  type TooltipContentElement,
  type TooltipContentProps,
} from '@prosekit/primitives/tooltip'

import { createComponent } from './create-component'

export const TooltipContent = createComponent<
  TooltipContentProps,
  TooltipContentElement
>('prosekit-tooltip-content-v2', defaultTooltipContentProps)

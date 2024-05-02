import {
  TooltipContentElement,
  defaultTooltipContentProps,
  type TooltipContentProps,
} from '@prosekit/web/tooltip'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'

export const TooltipContent: ForwardRefExoticComponent<
  Partial<TooltipContentProps> &
  RefAttributes<TooltipContentElement> &
  HTMLAttributes<TooltipContentElement>
> = createComponent<
  TooltipContentProps, 
  TooltipContentElement
>(
  'prosekit-tooltip-content',
  'TooltipContent',
  defaultTooltipContentProps,
)

import {
  TooltipContentElement,
  defaultTooltipContentProps,
  type TooltipContentProps,
} from '@prosekit/primitives/tooltip'
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
  'tooltip-content-v2',
  'TooltipContent',
  defaultTooltipContentProps,
)
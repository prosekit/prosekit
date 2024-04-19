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
  RefAttributes<TooltipContentElement> &
    TooltipContentProps &
    HTMLAttributes<TooltipContentElement>
> = createComponent<TooltipContentProps, TooltipContentElement>(
  'tooltip-content-v2',
  'TooltipContent',
  defaultTooltipContentProps,
)

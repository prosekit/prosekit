import {
  TooltipContentElement,
  defaultTooltipContentProps,
  type TooltipContentProps,
} from '@prosekit/primitives/tooltip'
import {
  type ForwardRefExoticComponent,
  type HTMLAttributes,
  type RefAttributes,
} from 'react'

import { createComponent } from './create-component'

export const TooltipContent: ForwardRefExoticComponent<
  RefAttributes<TooltipContentElement> &
    TooltipContentProps &
    HTMLAttributes<TooltipContentElement>
> = createComponent<TooltipContentProps, TooltipContentElement>(
  'prosekit-tooltip-content',
  'TooltipContent',
  defaultTooltipContentProps,
)

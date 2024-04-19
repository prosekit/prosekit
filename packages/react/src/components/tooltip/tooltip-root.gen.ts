import {
  TooltipRootElement,
  defaultTooltipRootProps,
  type TooltipRootProps,
} from '@prosekit/primitives/tooltip'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'

export const TooltipRoot: ForwardRefExoticComponent<
  RefAttributes<TooltipRootElement> &
    TooltipRootProps &
    HTMLAttributes<TooltipRootElement>
> = createComponent<TooltipRootProps, TooltipRootElement>(
  'tooltip-root-v2',
  'TooltipRoot',
  defaultTooltipRootProps,
)

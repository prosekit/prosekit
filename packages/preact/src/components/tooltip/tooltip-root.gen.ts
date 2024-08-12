import {
  TooltipRootElement,
  defaultTooltipRootProps,
  type TooltipRootProps,
} from '@prosekit/web/tooltip'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component'

export const TooltipRoot: ForwardRefExoticComponent<
  Partial<TooltipRootProps> &
  RefAttributes<TooltipRootElement> &
  HTMLAttributes<TooltipRootElement>
> = createComponent<
  TooltipRootProps, 
  TooltipRootElement
>(
  'prosekit-tooltip-root',
  'TooltipRoot',
  defaultTooltipRootProps,
)

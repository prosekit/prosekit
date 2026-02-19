import {
  type TooltipRootElement,
  type TooltipRootProps as Props,
  type TooltipRootEvents as Events,
  tooltipRootProps,
  tooltipRootEvents,
} from '@prosekit/web/tooltip'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component.ts'
import type { CreateProps } from '../create-props.ts'

/**
 * Props for the {@link TooltipRoot} component.
 */
export interface TooltipRootProps extends Partial<CreateProps<Props, Events>> {}

export const TooltipRoot: ForwardRefExoticComponent<
  TooltipRootProps &
  RefAttributes<TooltipRootElement> &
  HTMLAttributes<TooltipRootElement>
> = createComponent<
  TooltipRootProps,
  TooltipRootElement
>(
  'prosekit-tooltip-root',
  'TooltipRoot',
  Object.keys(tooltipRootProps),
  Object.keys(tooltipRootEvents),
)

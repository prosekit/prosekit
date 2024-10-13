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
} from 'preact/compat'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link TooltipRoot} component.
 */
export type TooltipRootProps = Partial<CreateProps<Props, Events>>
 
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
  Object.keys(tooltipRootProps),
  Object.keys(tooltipRootEvents),
)

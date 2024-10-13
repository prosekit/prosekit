import {
  type TooltipContentElement,
  type TooltipContentProps as Props,
  type TooltipContentEvents as Events,
  tooltipContentProps,
  tooltipContentEvents,
} from '@prosekit/web/tooltip'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link TooltipContent} component.
 */
export type TooltipContentProps = Partial<CreateProps<Props, Events>>
 
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
  Object.keys(tooltipContentProps),
  Object.keys(tooltipContentEvents),
)

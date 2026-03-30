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
} from 'react'

import { createComponent } from '../create-component.ts'
import type { CreateProps } from '../create-props.ts'

/**
 * Props for the {@link TooltipContent} component.
 */
export interface TooltipContentProps extends Partial<CreateProps<Props, Events>> {}

export const TooltipContent: ForwardRefExoticComponent<
  TooltipContentProps &
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

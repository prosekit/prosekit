import { 
  type TooltipContentElement,
  type TooltipContentProps as Props,
  type TooltipContentEvents as Events,
  tooltipContentProps,
  tooltipContentEvents,
} from '@prosekit/web/tooltip'
import type { Component } from 'solid-js'

import type { PropsWithElement } from '../../types'
import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link TooltipContent} component.
 */
export interface TooltipContentProps extends Partial<CreateProps<Props, Events>> {}

export const TooltipContent: Component<PropsWithElement<
  TooltipContentProps,
  TooltipContentElement
>> = createComponent<
  TooltipContentProps,
  TooltipContentElement
>(
  'prosekit-tooltip-content', 
  Object.keys(tooltipContentProps),
  Object.keys(tooltipContentEvents),
)

import { 
  type TooltipTriggerElement,
  type TooltipTriggerProps as Props,
  type TooltipTriggerEvents as Events,
  tooltipTriggerProps,
  tooltipTriggerEvents,
} from '@prosekit/web/tooltip'
import type { Component } from 'solid-js'

import type { PropsWithElement } from '../../types'
import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link TooltipTrigger} component.
 */
export interface TooltipTriggerProps extends Partial<CreateProps<Props, Events>> {}

export const TooltipTrigger: Component<PropsWithElement<
  TooltipTriggerProps,
  TooltipTriggerElement
>> = createComponent<
  TooltipTriggerProps,
  TooltipTriggerElement
>(
  'prosekit-tooltip-trigger', 
  Object.keys(tooltipTriggerProps),
  Object.keys(tooltipTriggerEvents),
)

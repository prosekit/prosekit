import { 
  type TooltipRootElement,
  type TooltipRootProps as Props,
  type TooltipRootEvents as Events,
  tooltipRootProps,
  tooltipRootEvents,
} from '@prosekit/web/tooltip'
import type { Component } from 'solid-js'

import type { PropsWithElement } from '../../types.ts'
import { createComponent } from '../create-component.ts'
import type { CreateProps } from '../create-props.ts'

/**
 * Props for the {@link TooltipRoot} component.
 */
export interface TooltipRootProps extends Partial<CreateProps<Props, Events>> {}

export const TooltipRoot: Component<PropsWithElement<
  TooltipRootProps,
  TooltipRootElement
>> = createComponent<
  TooltipRootProps,
  TooltipRootElement
>(
  'prosekit-tooltip-root', 
  Object.keys(tooltipRootProps),
  Object.keys(tooltipRootEvents),
)

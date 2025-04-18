import { 
  type PopoverTriggerElement,
  type PopoverTriggerProps as Props,
  type PopoverTriggerEvents as Events,
  popoverTriggerProps,
  popoverTriggerEvents,
} from '@prosekit/web/popover'
import type { Component } from 'solid-js'

import type { PropsWithElement } from '../../types'
import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link PopoverTrigger} component.
 */
export interface PopoverTriggerProps extends Partial<CreateProps<Props, Events>> {}

export const PopoverTrigger: Component<PropsWithElement<
  PopoverTriggerProps,
  PopoverTriggerElement
>> = createComponent<
  PopoverTriggerProps,
  PopoverTriggerElement
>(
  'prosekit-popover-trigger', 
  Object.keys(popoverTriggerProps),
  Object.keys(popoverTriggerEvents),
)

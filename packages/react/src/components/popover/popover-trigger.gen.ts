import {
  type PopoverTriggerElement,
  type PopoverTriggerProps as Props,
  type PopoverTriggerEvents as Events,
  popoverTriggerProps,
  popoverTriggerEvents,
} from '@prosekit/web/popover'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component.ts'
import type { CreateProps } from '../create-props.ts'

/**
 * Props for the {@link PopoverTrigger} component.
 */
export interface PopoverTriggerProps extends Partial<CreateProps<Props, Events>> {}

export const PopoverTrigger: ForwardRefExoticComponent<
  PopoverTriggerProps &
  RefAttributes<PopoverTriggerElement> &
  HTMLAttributes<PopoverTriggerElement>
> = createComponent<
  PopoverTriggerProps,
  PopoverTriggerElement
>(
  'prosekit-popover-trigger',
  'PopoverTrigger',
  Object.keys(popoverTriggerProps),
  Object.keys(popoverTriggerEvents),
)

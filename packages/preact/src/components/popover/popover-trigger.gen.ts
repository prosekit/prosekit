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
} from 'preact/compat'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link PopoverTrigger} component.
 */
export type PopoverTriggerProps = Partial<CreateProps<Props, Events>>
 
export const PopoverTrigger: ForwardRefExoticComponent<
  Partial<PopoverTriggerProps> &
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

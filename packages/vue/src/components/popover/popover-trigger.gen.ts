import {
  popoverTriggerProps,
  popoverTriggerEvents,
  type PopoverTriggerProps as Props,
  type PopoverTriggerEvents as Events,
} from '@prosekit/web/popover'

import { createComponent } from '../create-component'

/**
 * Props for the {@link PopoverTrigger} component.
 */
export interface PopoverTriggerProps extends Partial<Props> {}

/**
 * Events for the {@link PopoverTrigger} component.
 */
export interface PopoverTriggerEvents extends Partial<Events> {}

export const PopoverTrigger = createComponent<
  PopoverTriggerProps,
  PopoverTriggerEvents
>(
  'prosekit-popover-trigger',
  'PopoverTrigger',
  Object.keys(popoverTriggerProps),
  Object.keys(popoverTriggerEvents),
)

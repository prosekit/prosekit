import {
  popoverContentProps,
  popoverContentEvents,
  type PopoverContentProps as Props,
  type PopoverContentEvents as Events,
} from '@prosekit/web/popover'

import { createComponent } from '../create-component'

/**
 * Props for the {@link PopoverContent} component.
 */
export interface PopoverContentProps extends Partial<Props> {}

/**
 * Events for the {@link PopoverContent} component.
 */
export interface PopoverContentEvents extends Partial<Events> {}

export const PopoverContent = createComponent<
  PopoverContentProps,
  PopoverContentEvents
>(
  'prosekit-popover-content',
  'PopoverContent',
  Object.keys(popoverContentProps),
  Object.keys(popoverContentEvents),
)

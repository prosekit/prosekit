import {
  popoverRootProps,
  popoverRootEvents,
  type PopoverRootProps as Props,
  type PopoverRootEvents as Events,
} from '@prosekit/web/popover'

import { createComponent } from '../create-component'

/**
 * Props for the {@link PopoverRoot} component.
 */
export interface PopoverRootProps extends Partial<Props> {}

/**
 * Events for the {@link PopoverRoot} component.
 */
export interface PopoverRootEvents extends Partial<Events> {}

export const PopoverRoot = createComponent<
  PopoverRootProps,
  PopoverRootEvents
>(
  'prosekit-popover-root',
  'PopoverRoot',
  Object.keys(popoverRootProps),
  Object.keys(popoverRootEvents),
)

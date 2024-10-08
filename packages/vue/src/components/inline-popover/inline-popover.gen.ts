import {
  inlinePopoverProps,
  inlinePopoverEvents,
  type InlinePopoverProps as Props,
  type InlinePopoverEvents as Events,
} from '@prosekit/web/inline-popover'

import { createComponent } from '../create-component'

/**
 * Props for the {@link InlinePopover} component.
 */
export interface InlinePopoverProps extends Partial<Props> {}

/**
 * Events for the {@link InlinePopover} component.
 */
export interface InlinePopoverEvents extends Partial<Events> {}

export const InlinePopover = createComponent<
  InlinePopoverProps,
  InlinePopoverEvents
>(
  'prosekit-inline-popover',
  'InlinePopover',
  Object.keys(inlinePopoverProps),
  Object.keys(inlinePopoverEvents),
)

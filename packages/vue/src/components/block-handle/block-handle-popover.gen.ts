import {
  blockHandlePopoverProps,
  blockHandlePopoverEvents,
  type BlockHandlePopoverProps as Props,
  type BlockHandlePopoverEvents as Events,
} from '@prosekit/web/block-handle'

import { createComponent } from '../create-component'

/**
 * Props for the {@link BlockHandlePopover} component.
 */
export interface BlockHandlePopoverProps extends Partial<Props> {}

/**
 * Events for the {@link BlockHandlePopover} component.
 */
export interface BlockHandlePopoverEvents extends Partial<Events> {}

export const BlockHandlePopover = createComponent<
  BlockHandlePopoverProps,
  BlockHandlePopoverEvents
>(
  'prosekit-block-handle-popover',
  'BlockHandlePopover',
  Object.keys(blockHandlePopoverProps),
  Object.keys(blockHandlePopoverEvents),
)

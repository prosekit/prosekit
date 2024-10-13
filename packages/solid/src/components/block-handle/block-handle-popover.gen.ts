import { 
  type BlockHandlePopoverElement,
  type BlockHandlePopoverProps as Props,
  type BlockHandlePopoverEvents as Events,
  blockHandlePopoverProps,
  blockHandlePopoverEvents,
} from '@prosekit/web/block-handle'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link BlockHandlePopover} component.
 */
export interface BlockHandlePopoverProps extends Partial<CreateProps<Props, Events>> {}

export const BlockHandlePopover = createComponent<
  BlockHandlePopoverProps,
  BlockHandlePopoverElement
>(
  'prosekit-block-handle-popover', 
  Object.keys(blockHandlePopoverProps),
  Object.keys(blockHandlePopoverEvents),
)

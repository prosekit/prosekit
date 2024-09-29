import {
  type BlockHandlePopoverElement,
  type BlockHandlePopoverProps as Props,
  type BlockHandlePopoverEvents as Events,
  blockHandlePopoverProps,
  blockHandlePopoverEvents,
} from '@prosekit/web/block-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

export type BlockHandlePopoverProps = CreateProps<Props, Events>
 
export const BlockHandlePopover: ForwardRefExoticComponent<
  Partial<BlockHandlePopoverProps> &
  RefAttributes<BlockHandlePopoverElement> &
  HTMLAttributes<BlockHandlePopoverElement>
> = createComponent<
  BlockHandlePopoverProps, 
  BlockHandlePopoverElement
>(
  'prosekit-block-handle-popover',
  'BlockHandlePopover',
  Object.keys(blockHandlePopoverProps),
  Object.keys(blockHandlePopoverEvents),
)

import {
  BlockPopoverElement,
  defaultBlockPopoverProps,
  type BlockPopoverProps,
} from '@prosekit/primitives/block-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'

export const BlockPopover: ForwardRefExoticComponent<
  Partial<BlockPopoverProps> &
  RefAttributes<BlockPopoverElement> &
  HTMLAttributes<BlockPopoverElement>
> = createComponent<
  BlockPopoverProps, 
  BlockPopoverElement
>(
  'block-popover-v2',
  'BlockPopover',
  defaultBlockPopoverProps,
)

import {
  defaultBlockPopoverProps,
  type BlockPopoverElement,
  type BlockPopoverProps,
} from '@prosekit/web/block-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component'

export const BlockPopover: ForwardRefExoticComponent<
  Partial<BlockPopoverProps> &
  RefAttributes<BlockPopoverElement> &
  HTMLAttributes<BlockPopoverElement>
> = createComponent<
  BlockPopoverProps, 
  BlockPopoverElement
>(
  'prosekit-block-popover',
  'BlockPopover',
  defaultBlockPopoverProps,
)

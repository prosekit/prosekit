import {
  defaultBlockHandlePopoverProps,
  type BlockHandlePopoverElement,
  type BlockHandlePopoverProps
} from '@prosekit/web/block-handle'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'

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
  defaultBlockHandlePopoverProps,
)

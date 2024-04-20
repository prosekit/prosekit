import {
  InlinePopoverElement,
  defaultInlinePopoverProps,
  type InlinePopoverProps,
} from '@prosekit/primitives/inline-popover'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'

export const InlinePopover: ForwardRefExoticComponent<
  Partial<InlinePopoverProps> &
  RefAttributes<InlinePopoverElement> &
  HTMLAttributes<InlinePopoverElement>
> = createComponent<
  InlinePopoverProps, 
  InlinePopoverElement
>(
  'inline-popover-v2',
  'InlinePopover',
  defaultInlinePopoverProps,
)

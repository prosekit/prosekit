import {
  InlinePopoverElement,
  defaultInlinePopoverProps,
  type InlinePopoverProps,
} from '@prosekit/web/inline-popover'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component'

export const InlinePopover: ForwardRefExoticComponent<
  Partial<InlinePopoverProps> &
  RefAttributes<InlinePopoverElement> &
  HTMLAttributes<InlinePopoverElement>
> = createComponent<
  InlinePopoverProps, 
  InlinePopoverElement
>(
  'prosekit-inline-popover',
  'InlinePopover',
  defaultInlinePopoverProps,
)

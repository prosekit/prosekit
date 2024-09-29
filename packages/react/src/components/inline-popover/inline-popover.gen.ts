import {
  type InlinePopoverElement,
  type InlinePopoverProps as Props,
  type InlinePopoverEvents as Events,
  inlinePopoverProps,
  inlinePopoverEvents,
} from '@prosekit/web/inline-popover'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

export type InlinePopoverProps = CreateProps<Props, Events>
 
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
  Object.keys(inlinePopoverProps),
  Object.keys(inlinePopoverEvents),
)

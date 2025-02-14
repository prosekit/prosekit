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
} from 'preact/compat'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link InlinePopover} component.
 */
export interface InlinePopoverProps extends Partial<CreateProps<Props, Events>> {}
 
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

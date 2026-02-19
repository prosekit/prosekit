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

import { createComponent } from '../create-component.ts'
import type { CreateProps } from '../create-props.ts'

/**
 * Props for the {@link BlockHandlePopover} component.
 */
export interface BlockHandlePopoverProps extends Partial<CreateProps<Props, Events>> {}

export const BlockHandlePopover: ForwardRefExoticComponent<
  BlockHandlePopoverProps &
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

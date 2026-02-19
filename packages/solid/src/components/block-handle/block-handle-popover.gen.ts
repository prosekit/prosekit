import { 
  type BlockHandlePopoverElement,
  type BlockHandlePopoverProps as Props,
  type BlockHandlePopoverEvents as Events,
  blockHandlePopoverProps,
  blockHandlePopoverEvents,
} from '@prosekit/web/block-handle'
import type { Component } from 'solid-js'

import type { PropsWithElement } from '../../types.ts'
import { createComponent } from '../create-component.ts'
import type { CreateProps } from '../create-props.ts'

/**
 * Props for the {@link BlockHandlePopover} component.
 */
export interface BlockHandlePopoverProps extends Partial<CreateProps<Props, Events>> {}

export const BlockHandlePopover: Component<PropsWithElement<
  BlockHandlePopoverProps,
  BlockHandlePopoverElement
>> = createComponent<
  BlockHandlePopoverProps,
  BlockHandlePopoverElement
>(
  'prosekit-block-handle-popover', 
  Object.keys(blockHandlePopoverProps),
  Object.keys(blockHandlePopoverEvents),
)

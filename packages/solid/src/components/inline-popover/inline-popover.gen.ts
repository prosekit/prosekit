import { 
  type InlinePopoverElement,
  type InlinePopoverProps as Props,
  type InlinePopoverEvents as Events,
  inlinePopoverProps,
  inlinePopoverEvents,
} from '@prosekit/web/inline-popover'
import type { Component } from 'solid-js'

import type { PropsWithElement } from '../../types.ts'
import { createComponent } from '../create-component.ts'
import type { CreateProps } from '../create-props.ts'

/**
 * Props for the {@link InlinePopover} component.
 */
export interface InlinePopoverProps extends Partial<CreateProps<Props, Events>> {}

export const InlinePopover: Component<PropsWithElement<
  InlinePopoverProps,
  InlinePopoverElement
>> = createComponent<
  InlinePopoverProps,
  InlinePopoverElement
>(
  'prosekit-inline-popover', 
  Object.keys(inlinePopoverProps),
  Object.keys(inlinePopoverEvents),
)

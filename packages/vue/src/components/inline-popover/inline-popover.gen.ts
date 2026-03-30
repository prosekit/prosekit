import {
  inlinePopoverProps,
  inlinePopoverEvents,
  type InlinePopoverProps as Props,
  type InlinePopoverEvents as Events,
} from '@prosekit/web/inline-popover'
import type { DefineSetupFnComponent, HTMLAttributes } from 'vue'

import { createComponent } from '../create-component.ts'
import type { CreateEmits } from '../create-emits.ts'

/**
 * Props for the {@link InlinePopover} component.
 */
export interface InlinePopoverProps extends Partial<Props> {}

/**
 * Emits for the {@link InlinePopover} component.
 */
export interface InlinePopoverEmits extends CreateEmits<Events> {}

export const InlinePopover: DefineSetupFnComponent<
  InlinePopoverProps & HTMLAttributes,
  InlinePopoverEmits
> = createComponent<
  InlinePopoverProps,
  InlinePopoverEmits
>(
  'prosekit-inline-popover',
  'InlinePopover',
  Object.keys(inlinePopoverProps),
  Object.keys(inlinePopoverEvents),
)

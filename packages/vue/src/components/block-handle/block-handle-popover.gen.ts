import {
  blockHandlePopoverProps,
  blockHandlePopoverEvents,
  type BlockHandlePopoverProps as Props,
  type BlockHandlePopoverEvents as Events,
} from '@prosekit/web/block-handle'
import type { DefineSetupFnComponent, HTMLAttributes } from 'vue'

import { createComponent } from '../create-component.ts'
import type { CreateEmits } from '../create-emits.ts'

/**
 * Props for the {@link BlockHandlePopover} component.
 */
export interface BlockHandlePopoverProps extends Partial<Props> {}

/**
 * Emits for the {@link BlockHandlePopover} component.
 */
export interface BlockHandlePopoverEmits extends CreateEmits<Events> {}

export const BlockHandlePopover: DefineSetupFnComponent<
  BlockHandlePopoverProps & HTMLAttributes,
  BlockHandlePopoverEmits
> = createComponent<
  BlockHandlePopoverProps,
  BlockHandlePopoverEmits
>(
  'prosekit-block-handle-popover',
  'BlockHandlePopover',
  Object.keys(blockHandlePopoverProps),
  Object.keys(blockHandlePopoverEvents),
)

import {
  blockHandleAddProps,
  blockHandleAddEvents,
  type BlockHandleAddProps as Props,
  type BlockHandleAddEvents as Events,
} from '@prosekit/web/block-handle'
import type { DefineSetupFnComponent, HTMLAttributes } from 'vue'

import { createComponent } from '../create-component.ts'
import type { CreateEmits } from '../create-emits.ts'

/**
 * Props for the {@link BlockHandleAdd} component.
 */
export interface BlockHandleAddProps extends Partial<Props> {}

/**
 * Emits for the {@link BlockHandleAdd} component.
 */
export interface BlockHandleAddEmits extends CreateEmits<Events> {}

export const BlockHandleAdd: DefineSetupFnComponent<
  BlockHandleAddProps & HTMLAttributes,
  BlockHandleAddEmits
> = createComponent<
  BlockHandleAddProps,
  BlockHandleAddEmits
>(
  'prosekit-block-handle-add',
  'BlockHandleAdd',
  Object.keys(blockHandleAddProps),
  Object.keys(blockHandleAddEvents),
)

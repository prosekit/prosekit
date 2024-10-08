import {
  blockHandleAddProps,
  blockHandleAddEvents,
  type BlockHandleAddProps as Props,
  type BlockHandleAddEvents as Events,
} from '@prosekit/web/block-handle'

import { createComponent } from '../create-component'

/**
 * Props for the {@link BlockHandleAdd} component.
 */
export interface BlockHandleAddProps extends Partial<Props> {}

/**
 * Events for the {@link BlockHandleAdd} component.
 */
export interface BlockHandleAddEvents extends Partial<Events> {}

export const BlockHandleAdd = createComponent<
  BlockHandleAddProps,
  BlockHandleAddEvents
>(
  'prosekit-block-handle-add',
  'BlockHandleAdd',
  Object.keys(blockHandleAddProps),
  Object.keys(blockHandleAddEvents),
)

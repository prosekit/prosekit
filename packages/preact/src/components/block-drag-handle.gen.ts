import '@prosekit/lit/block-drag-handle'
import type { BlockDragHandleProps as BlockDragHandleElementProps } from '@prosekit/lit/block-drag-handle'
import type { ComponentType } from 'preact'
import { h } from 'preact'

import type { PropsWithClass, PropsWithChildren } from '../types'

export type BlockDragHandleProps = PropsWithChildren<PropsWithClass<BlockDragHandleElementProps>>

export const BlockDragHandle: ComponentType<BlockDragHandleProps> = (props) => {
  return h('prosekit-block-drag-handle', props as object)
}

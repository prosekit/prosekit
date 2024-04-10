import { createComponent } from '@lit/react'
import { BlockDragHandle as BlockDragHandleElement, type BlockDragHandleProps as BlockDragHandleElementProps } from '@prosekit/lit/block-drag-handle'
import React from 'react'

import {type PropsWithClassName} from '../types'

export type BlockDragHandleProps = React.PropsWithChildren<PropsWithClassName<BlockDragHandleElementProps>>

const BlockDragHandleInner = createComponent({
  tagName: 'prosekit-block-drag-handle',
  elementClass: BlockDragHandleElement,
  react: React,
  displayName: 'BlockDragHandleInner',
})

export const BlockDragHandle: React.ComponentType<
  BlockDragHandleProps & React.RefAttributes<BlockDragHandleElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(BlockDragHandleInner, { ...props, ref })
})

BlockDragHandle.displayName = 'BlockDragHandle'

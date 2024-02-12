import { createComponent } from '@lit/react'
import { BlockPopover as BlockPopoverElement, type BlockPopoverProps as BlockPopoverElementProps } from '@prosekit/lit/block-popover'
import React from 'react'

import {type PropsWithClassName} from '../types'

export type BlockPopoverProps = React.PropsWithChildren<PropsWithClassName<BlockPopoverElementProps>>

const BlockPopoverInner = createComponent({
  tagName: 'prosekit-block-popover',
  elementClass: BlockPopoverElement,
  react: React,
  displayName: 'BlockPopoverInner',
})

export const BlockPopover: React.ComponentType<
  BlockPopoverProps & React.RefAttributes<BlockPopoverElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(BlockPopoverInner, { ...props, ref })
})

BlockPopover.displayName = 'BlockPopover'

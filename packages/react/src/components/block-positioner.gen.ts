import { createComponent } from '@lit/react'
import { BlockPositioner as BlockPositionerElement, type BlockPositionerProps as BlockPositionerElementProps } from '@prosekit/lit/block-positioner'
import React from 'react'

import {type PropsWithClassName} from '../types'

export type BlockPositionerProps = React.PropsWithChildren<PropsWithClassName<BlockPositionerElementProps>>

const BlockPositionerInner = createComponent({
  tagName: 'prosekit-block-positioner',
  elementClass: BlockPositionerElement,
  react: React,
  displayName: 'BlockPositionerInner',
})

export const BlockPositioner: React.ComponentType<
  BlockPositionerProps & React.RefAttributes<BlockPositionerElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(BlockPositionerInner, { ...props, ref })
})

BlockPositioner.displayName = 'BlockPositioner'

import '@prosekit/lit/block-positioner'
import type { BlockPositionerProps as BlockPositionerElementProps } from '@prosekit/lit/block-positioner'
import type { ComponentType } from 'preact'
import { h } from 'preact'

import type { PropsWithClass, PropsWithChildren } from '../types'

export type BlockPositionerProps = PropsWithChildren<PropsWithClass<BlockPositionerElementProps>>

export const BlockPositioner: ComponentType<BlockPositionerProps> = (props) => {
  return h('prosekit-block-positioner', props as object)
}

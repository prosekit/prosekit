import '@prosekit/lit/block-popover'
import type { BlockPopoverProps as BlockPopoverElementProps } from '@prosekit/lit/block-popover'
import type { ComponentType } from 'preact'
import { h } from 'preact'

import type { PropsWithClass, PropsWithChildren } from '../types'

export type BlockPopoverProps = PropsWithChildren<PropsWithClass<BlockPopoverElementProps>>

export const BlockPopover: ComponentType<BlockPopoverProps> = (props) => {
  return h('prosekit-block-popover', props as object)
}

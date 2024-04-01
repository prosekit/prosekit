import '@prosekit/lit/inline-popover'
import type { InlinePopoverProps as InlinePopoverElementProps } from '@prosekit/lit/inline-popover'
import type { ComponentType } from 'preact'
import { h } from 'preact'

import type { PropsWithClass, PropsWithChildren } from '../types'

export type InlinePopoverProps = PropsWithChildren<PropsWithClass<InlinePopoverElementProps>>

export const InlinePopover: ComponentType<InlinePopoverProps> = (props) => {
  return h('prosekit-inline-popover', props as object)
}

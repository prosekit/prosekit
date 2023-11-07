import '@prosekit/lit/inline-popover'
import type { InlinePopoverProps as InlinePopoverElementProps } from '@prosekit/lit/inline-popover'
import type { ComponentChildren, ComponentType } from 'preact'
import { h } from 'preact'

export type InlinePopoverProps = {
  class?: string
  children?: ComponentChildren
} & InlinePopoverElementProps

export const InlinePopover: ComponentType<InlinePopoverProps> = (props) => {
  return h('prosekit-inline-popover', props)
}

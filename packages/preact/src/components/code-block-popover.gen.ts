import '@prosekit/lit/components/code-block-popover'
import type { CodeBlockPopoverProps as CodeBlockPopoverElementProps } from '@prosekit/lit/components/code-block-popover'
import type { ComponentChildren, ComponentType } from 'preact'
import { h } from 'preact'

export type CodeBlockPopoverProps = {
  class?: string
  children?: ComponentChildren
} & CodeBlockPopoverElementProps

export const CodeBlockPopover: ComponentType<CodeBlockPopoverProps> = (props) => {
  return h('prosekit-code-block-popover', props)
}

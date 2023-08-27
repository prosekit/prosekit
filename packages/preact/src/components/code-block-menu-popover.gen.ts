import '@prosekit/lit/components/code-block-menu-popover'
import type { CodeBlockMenuPopoverProps as CodeBlockMenuPopoverElementProps } from '@prosekit/lit/components/code-block-menu-popover'
import type { ComponentChildren, ComponentType } from 'preact'
import { h } from 'preact'

export type CodeBlockMenuPopoverProps = {
  class?: string
  children?: ComponentChildren
} & CodeBlockMenuPopoverElementProps

export const CodeBlockMenuPopover: ComponentType<CodeBlockMenuPopoverProps> = (props) => {
  return h('prosekit-code-block-menu-popover', props)
}

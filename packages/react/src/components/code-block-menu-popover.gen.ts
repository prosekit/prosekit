import { createComponent } from '@lit-labs/react'
import type { SimplifyUnion } from '@prosekit/core'
import { CodeBlockMenuPopover as CodeBlockMenuPopoverElement, type CodeBlockMenuPopoverProps as CodeBlockMenuPopoverElementProps } from '@prosekit/lit/components/code-block-menu-popover'
import React, { type ComponentType } from 'react'

export type CodeBlockMenuPopoverProps = SimplifyUnion<{
  className?: string,
  children?: React.ReactNode,
} & CodeBlockMenuPopoverElementProps>

const CodeBlockMenuPopoverComponent = createComponent({
  tagName: 'prosekit-code-block-menu-popover',
  elementClass: CodeBlockMenuPopoverElement,
  react: React,
  displayName: 'CodeBlockMenuPopoverComponent',
})

export const CodeBlockMenuPopover: ComponentType<CodeBlockMenuPopoverProps> = (props) => {
  return React.createElement(CodeBlockMenuPopoverComponent, props)
}

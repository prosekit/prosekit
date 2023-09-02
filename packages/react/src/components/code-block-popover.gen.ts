import { createComponent } from '@lit-labs/react'
import type { SimplifyUnion } from '@prosekit/core'
import { CodeBlockPopover as CodeBlockPopoverElement, type CodeBlockPopoverProps as CodeBlockPopoverElementProps } from '@prosekit/lit/components/code-block-popover'
import React, { type ComponentType } from 'react'

export type CodeBlockPopoverProps = SimplifyUnion<{
  className?: string,
  children?: React.ReactNode,
} & CodeBlockPopoverElementProps>

const CodeBlockPopoverComponent = createComponent({
  tagName: 'prosekit-code-block-popover',
  elementClass: CodeBlockPopoverElement,
  react: React,
  displayName: 'CodeBlockPopoverComponent',
})

export const CodeBlockPopover: ComponentType<CodeBlockPopoverProps> = (props) => {
  return React.createElement(
    CodeBlockPopoverComponent,
    // The type in @lit-labs/react is not compatible to React.ReactNode
    props as Omit<typeof props, 'children'>,
  )
}

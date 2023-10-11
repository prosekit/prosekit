import { createComponent } from '@lit/react'
import type { SimplifyUnion } from '@prosekit/core'
import { CodeBlockPopover as CodeBlockPopoverElement, type CodeBlockPopoverProps as CodeBlockPopoverElementProps } from '@prosekit/lit/components/code-block-popover'
import React from 'react'
import type { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react'

export type CodeBlockPopoverProps = SimplifyUnion<{
  className?: string,
  children?: React.ReactNode,
} & CodeBlockPopoverElementProps>

const CodeBlockPopoverInner = createComponent({
  tagName: 'prosekit-code-block-popover',
  elementClass: CodeBlockPopoverElement,
  react: React,
  displayName: 'CodeBlockPopoverInner',
})

export const CodeBlockPopover: ForwardRefExoticComponent<
  PropsWithoutRef<CodeBlockPopoverProps> & RefAttributes<CodeBlockPopoverElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(CodeBlockPopoverInner, { ...props, ref })
})

CodeBlockPopover.displayName = 'CodeBlockPopover'

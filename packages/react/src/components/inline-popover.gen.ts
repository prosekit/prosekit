import { createComponent } from '@lit/react'
import type { SimplifyUnion } from '@prosekit/core'
import { InlinePopover as InlinePopoverElement, type InlinePopoverProps as InlinePopoverElementProps } from '@prosekit/lit/inline-popover'
import React from 'react'

export type InlinePopoverProps = SimplifyUnion<{
  className?: string,
  children?: React.ReactNode,
} & InlinePopoverElementProps>

const InlinePopoverInner = createComponent({
  tagName: 'prosekit-inline-popover',
  elementClass: InlinePopoverElement,
  react: React,
  displayName: 'InlinePopoverInner',
})

export const InlinePopover: React.ComponentType<
  InlinePopoverProps & React.RefAttributes<InlinePopoverElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(InlinePopoverInner, { ...props, ref })
})

InlinePopover.displayName = 'InlinePopover'

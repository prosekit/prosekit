import { createComponent } from '@lit/react'
import type { SimplifyUnion } from '@prosekit/core'
import { Popover as PopoverElement, type PopoverProps as PopoverElementProps } from '@prosekit/lit/popover'
import type { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react'
import React from 'react'

export type PopoverProps = SimplifyUnion<{
  className?: string,
  children?: React.ReactNode,
} & PopoverElementProps>

const PopoverInner = createComponent({
  tagName: 'prosekit-popover',
  elementClass: PopoverElement,
  react: React,
  displayName: 'PopoverInner',
})

export const Popover: ForwardRefExoticComponent<
  PropsWithoutRef<PopoverProps> & RefAttributes<PopoverElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(PopoverInner, { ...props, ref })
})

Popover.displayName = 'Popover'

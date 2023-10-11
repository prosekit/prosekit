import { createComponent } from '@lit/react'
import type { SimplifyUnion } from '@prosekit/core'
import { ComboBoxList as ComboBoxListElement, type ComboBoxListProps as ComboBoxListElementProps } from '@prosekit/lit/components/combo-box-list'
import React from 'react'
import type { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react'

export type ComboBoxListProps = SimplifyUnion<{
  className?: string,
  children?: React.ReactNode,
} & ComboBoxListElementProps>

const ComboBoxListInner = createComponent({
  tagName: 'prosekit-combo-box-list',
  elementClass: ComboBoxListElement,
  react: React,
  displayName: 'ComboBoxListInner',
})

export const ComboBoxList: ForwardRefExoticComponent<
  PropsWithoutRef<ComboBoxListProps> & RefAttributes<ComboBoxListElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(ComboBoxListInner, { ...props, ref })
})

ComboBoxList.displayName = 'ComboBoxList'

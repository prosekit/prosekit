import { createComponent } from '@lit/react'
import type { SimplifyUnion } from '@prosekit/core'
import { ComboBoxItem as ComboBoxItemElement, type ComboBoxItemProps as ComboBoxItemElementProps } from '@prosekit/lit/components/combo-box-item'
import React from 'react'
import type { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react'

export type ComboBoxItemProps = SimplifyUnion<{
  className?: string,
  children?: React.ReactNode,
} & ComboBoxItemElementProps>

const ComboBoxItemInner = createComponent({
  tagName: 'prosekit-combo-box-item',
  elementClass: ComboBoxItemElement,
  react: React,
  displayName: 'ComboBoxItemInner',
})

export const ComboBoxItem: ForwardRefExoticComponent<
  PropsWithoutRef<ComboBoxItemProps> & RefAttributes<ComboBoxItemElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(ComboBoxItemInner, { ...props, ref })
})

ComboBoxItem.displayName = 'ComboBoxItem'

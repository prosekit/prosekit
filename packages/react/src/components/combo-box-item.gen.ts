import { createComponent } from '@lit/react'
import type { SimplifyUnion } from '@prosekit/core'
import { ComboBoxItem as ComboBoxItemElement, type ComboBoxItemProps as ComboBoxItemElementProps } from '@prosekit/lit/components/combo-box-item'
import React, { type ComponentType } from 'react'

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

export const ComboBoxItem: ComponentType<ComboBoxItemProps> = (props) => {
  return React.createElement(ComboBoxItemInner, props)
}

ComboBoxItem.displayName = 'ComboBoxItem'

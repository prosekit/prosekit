import { createComponent } from '@lit-labs/react'
import type { SimplifyUnion } from '@prosekit/core'
import { ComboBoxItem as ComboBoxItemElement, type ComboBoxItemProps as ComboBoxItemElementProps } from '@prosekit/lit/components/combo-box-item'
import React, { type ComponentType } from 'react'

export type ComboBoxItemProps = SimplifyUnion<{
  className?: string,
  children?: React.ReactNode,
} & ComboBoxItemElementProps>

const ComboBoxItemComponent = createComponent({
  tagName: 'prosekit-combo-box-item',
  elementClass: ComboBoxItemElement,
  react: React,
  displayName: 'ComboBoxItemComponent',
})

export const ComboBoxItem: ComponentType<ComboBoxItemProps> = (props) => {
  return React.createElement(
    ComboBoxItemComponent,
    // The type in @lit-labs/react is not compatible to React.ReactNode
    props as Omit<typeof props, 'children'>,
  )
}

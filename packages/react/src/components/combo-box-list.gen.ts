import { createComponent } from '@lit-labs/react'
import type { SimplifyUnion } from '@prosekit/core'
import { ComboBoxList as ComboBoxListElement, type ComboBoxListProps as ComboBoxListElementProps } from '@prosekit/lit/components/combo-box-list'
import React, { type ComponentType } from 'react'

export type ComboBoxListProps = SimplifyUnion<{
  className?: string,
  children?: React.ReactNode,
} & ComboBoxListElementProps>

const ComboBoxListComponent = createComponent({
  tagName: 'prosekit-combo-box-list',
  elementClass: ComboBoxListElement,
  react: React,
  displayName: 'ComboBoxListComponent',
})

export const ComboBoxList: ComponentType<ComboBoxListProps> = (props) => {
  return React.createElement(
    ComboBoxListComponent,
    // The type in @lit-labs/react is not compatible to React.ReactNode
    props as Omit<typeof props, 'children'>,
  )
}

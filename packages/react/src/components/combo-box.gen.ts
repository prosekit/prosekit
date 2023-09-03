import { createComponent } from '@lit-labs/react'
import type { SimplifyUnion } from '@prosekit/core'
import { ComboBox as ComboBoxElement, type ComboBoxProps as ComboBoxElementProps } from '@prosekit/lit/components/combo-box'
import React, { type ComponentType } from 'react'

export type ComboBoxProps = SimplifyUnion<{
  className?: string,
  children?: React.ReactNode,
} & ComboBoxElementProps>

const ComboBoxComponent = createComponent({
  tagName: 'prosekit-combo-box',
  elementClass: ComboBoxElement,
  react: React,
  displayName: 'ComboBoxComponent',
})

export const ComboBox: ComponentType<ComboBoxProps> = (props) => {
  return React.createElement(
    ComboBoxComponent,
    // The type in @lit-labs/react is not compatible to React.ReactNode
    props as Omit<typeof props, 'children'>,
  )
}

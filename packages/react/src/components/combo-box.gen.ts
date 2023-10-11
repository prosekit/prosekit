import { createComponent } from '@lit/react'
import type { SimplifyUnion } from '@prosekit/core'
import { ComboBox as ComboBoxElement, type ComboBoxProps as ComboBoxElementProps } from '@prosekit/lit/components/combo-box'
import React, { type ComponentType } from 'react'

export type ComboBoxProps = SimplifyUnion<{
  className?: string,
  children?: React.ReactNode,
} & ComboBoxElementProps>

const ComboBoxInner = createComponent({
  tagName: 'prosekit-combo-box',
  elementClass: ComboBoxElement,
  react: React,
  displayName: 'ComboBoxInner',
})

export const ComboBox: ComponentType<ComboBoxProps> = (props) => {
  return React.createElement(ComboBoxInner, props)
}

ComboBox.displayName = 'ComboBox'

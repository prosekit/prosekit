import { createComponent } from '@lit-labs/react'
import type { SimplifyUnion } from '@prosekit/core'
import { ComboBoxInput as ComboBoxInputElement, type ComboBoxInputProps as ComboBoxInputElementProps } from '@prosekit/lit/components/combo-box-input'
import React, { type ComponentType } from 'react'

export type ComboBoxInputProps = SimplifyUnion<{
  className?: string,
  children?: React.ReactNode,
} & ComboBoxInputElementProps>

const ComboBoxInputComponent = createComponent({
  tagName: 'prosekit-combo-box-input',
  elementClass: ComboBoxInputElement,
  react: React,
  displayName: 'ComboBoxInputComponent',
})

export const ComboBoxInput: ComponentType<ComboBoxInputProps> = (props) => {
  return React.createElement(ComboBoxInputComponent, props)
}

import { createComponent } from '@lit/react'
import type { SimplifyUnion } from '@prosekit/core'
import { ComboBoxInput as ComboBoxInputElement, type ComboBoxInputProps as ComboBoxInputElementProps } from '@prosekit/lit/components/combo-box-input'
import React, { type ComponentType } from 'react'

export type ComboBoxInputProps = SimplifyUnion<{
  className?: string,
  children?: React.ReactNode,
} & ComboBoxInputElementProps>

const ComboBoxInputInner = createComponent({
  tagName: 'prosekit-combo-box-input',
  elementClass: ComboBoxInputElement,
  react: React,
  displayName: 'ComboBoxInputInner',
})

export const ComboBoxInput: ComponentType<ComboBoxInputProps> = (props) => {
  return React.createElement(ComboBoxInputInner, props)
}

ComboBoxInput.displayName = 'ComboBoxInput'

import { createComponent } from '@lit/react'
import { ComboBoxInput as ComboBoxInputElement, type ComboBoxInputProps as ComboBoxInputElementProps } from '@prosekit/lit/combo-box-input'
import React from 'react'

import {type PropsWithClassName} from '../types'

export type ComboBoxInputProps = React.PropsWithChildren<PropsWithClassName<ComboBoxInputElementProps>>

const ComboBoxInputInner = createComponent({
  tagName: 'prosekit-combo-box-input',
  elementClass: ComboBoxInputElement,
  react: React,
  displayName: 'ComboBoxInputInner',
})

export const ComboBoxInput: React.ComponentType<
  ComboBoxInputProps & React.RefAttributes<ComboBoxInputElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(ComboBoxInputInner, { ...props, ref })
})

ComboBoxInput.displayName = 'ComboBoxInput'

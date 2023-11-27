import { createComponent } from '@lit/react'
import { ComboBox as ComboBoxElement, type ComboBoxProps as ComboBoxElementProps } from '@prosekit/lit/combo-box'
import React from 'react'

import {type PropsWithClassName} from '../types'

export type ComboBoxProps = React.PropsWithChildren<PropsWithClassName<ComboBoxElementProps>>

const ComboBoxInner = createComponent({
  tagName: 'prosekit-combo-box',
  elementClass: ComboBoxElement,
  react: React,
  displayName: 'ComboBoxInner',
})

export const ComboBox: React.ComponentType<
  ComboBoxProps & React.RefAttributes<ComboBoxElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(ComboBoxInner, { ...props, ref })
})

ComboBox.displayName = 'ComboBox'

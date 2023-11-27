import { createComponent } from '@lit/react'
import { ComboBoxItem as ComboBoxItemElement, type ComboBoxItemProps as ComboBoxItemElementProps } from '@prosekit/lit/combo-box-item'
import React from 'react'

import {type PropsWithClassName} from '../types'

export type ComboBoxItemProps = React.PropsWithChildren<PropsWithClassName<ComboBoxItemElementProps>>

const ComboBoxItemInner = createComponent({
  tagName: 'prosekit-combo-box-item',
  elementClass: ComboBoxItemElement,
  react: React,
  displayName: 'ComboBoxItemInner',
})

export const ComboBoxItem: React.ComponentType<
  ComboBoxItemProps & React.RefAttributes<ComboBoxItemElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(ComboBoxItemInner, { ...props, ref })
})

ComboBoxItem.displayName = 'ComboBoxItem'

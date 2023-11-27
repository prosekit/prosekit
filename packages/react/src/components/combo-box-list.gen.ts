import { createComponent } from '@lit/react'
import { ComboBoxList as ComboBoxListElement, type ComboBoxListProps as ComboBoxListElementProps } from '@prosekit/lit/combo-box-list'
import React from 'react'

import {type PropsWithClassName} from '../types'

export type ComboBoxListProps = React.PropsWithChildren<PropsWithClassName<ComboBoxListElementProps>>

const ComboBoxListInner = createComponent({
  tagName: 'prosekit-combo-box-list',
  elementClass: ComboBoxListElement,
  react: React,
  displayName: 'ComboBoxListInner',
})

export const ComboBoxList: React.ComponentType<
  ComboBoxListProps & React.RefAttributes<ComboBoxListElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(ComboBoxListInner, { ...props, ref })
})

ComboBoxList.displayName = 'ComboBoxList'

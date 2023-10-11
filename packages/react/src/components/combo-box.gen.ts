import { createComponent } from '@lit/react'
import type { SimplifyUnion } from '@prosekit/core'
import { ComboBox as ComboBoxElement, type ComboBoxProps as ComboBoxElementProps } from '@prosekit/lit/components/combo-box'
import type { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react'
import React from 'react'

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

export const ComboBox: ForwardRefExoticComponent<
  PropsWithoutRef<ComboBoxProps> & RefAttributes<ComboBoxElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(ComboBoxInner, { ...props, ref })
})

ComboBox.displayName = 'ComboBox'

import { createComponent } from '@lit/react'
import type { SimplifyUnion } from '@prosekit/core'
import { ComboBox2 as ComboBox2Element, type ComboBox2Props as ComboBox2ElementProps } from '@prosekit/lit/combo-box2'
import type { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react'
import React from 'react'

export type ComboBox2Props = SimplifyUnion<{
  className?: string,
  children?: React.ReactNode,
} & ComboBox2ElementProps>

const ComboBox2Inner = createComponent({
  tagName: 'prosekit-combo-box2',
  elementClass: ComboBox2Element,
  react: React,
  displayName: 'ComboBox2Inner',
})

export const ComboBox2: ForwardRefExoticComponent<
  PropsWithoutRef<ComboBox2Props> & RefAttributes<ComboBox2Element>
> = React.forwardRef((props, ref) => {
  return React.createElement(ComboBox2Inner, { ...props, ref })
})

ComboBox2.displayName = 'ComboBox2'

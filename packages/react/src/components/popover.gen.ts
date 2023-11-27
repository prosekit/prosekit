import { createComponent } from '@lit/react'
import { Popover as PopoverElement, type PopoverProps as PopoverElementProps } from '@prosekit/lit/popover'
import React from 'react'

import {type PropsWithClassName} from '../types'

export type PopoverProps = React.PropsWithChildren<PropsWithClassName<PopoverElementProps>>

const PopoverInner = createComponent({
  tagName: 'prosekit-popover',
  elementClass: PopoverElement,
  react: React,
  displayName: 'PopoverInner',
})

export const Popover: React.ComponentType<
  PopoverProps & React.RefAttributes<PopoverElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(PopoverInner, { ...props, ref })
})

Popover.displayName = 'Popover'

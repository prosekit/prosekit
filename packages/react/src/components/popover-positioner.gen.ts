import { createComponent } from '@lit/react'
import { PopoverPositioner as PopoverPositionerElement, type PopoverPositionerProps as PopoverPositionerElementProps } from '@prosekit/lit/popover-positioner'
import React from 'react'

import {type PropsWithClassName} from '../types'

export type PopoverPositionerProps = React.PropsWithChildren<PropsWithClassName<PopoverPositionerElementProps>>

const PopoverPositionerInner = createComponent({
  tagName: 'prosekit-popover-positioner',
  elementClass: PopoverPositionerElement,
  react: React,
  displayName: 'PopoverPositionerInner',
})

export const PopoverPositioner: React.ComponentType<
  PopoverPositionerProps & React.RefAttributes<PopoverPositionerElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(PopoverPositionerInner, { ...props, ref })
})

PopoverPositioner.displayName = 'PopoverPositioner'

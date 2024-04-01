import { createComponent } from '@lit/react'
import { PopoverRoot as PopoverRootElement, type PopoverRootProps as PopoverRootElementProps } from '@prosekit/lit/popover-root'
import React from 'react'

import {type PropsWithClassName} from '../types'

export type PopoverRootProps = React.PropsWithChildren<PropsWithClassName<PopoverRootElementProps>>

const PopoverRootInner = createComponent({
  tagName: 'prosekit-popover-root',
  elementClass: PopoverRootElement,
  react: React,
  displayName: 'PopoverRootInner',
})

export const PopoverRoot: React.ComponentType<
  PopoverRootProps & React.RefAttributes<PopoverRootElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(PopoverRootInner, { ...props, ref })
})

PopoverRoot.displayName = 'PopoverRoot'

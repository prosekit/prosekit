import { createComponent } from '@lit/react'
import { PopoverContent as PopoverContentElement, type PopoverContentProps as PopoverContentElementProps } from '@prosekit/lit/popover-content'
import React from 'react'

import {type PropsWithClassName} from '../types'

export type PopoverContentProps = React.PropsWithChildren<PropsWithClassName<PopoverContentElementProps>>

const PopoverContentInner = createComponent({
  tagName: 'prosekit-popover-content',
  elementClass: PopoverContentElement,
  react: React,
  displayName: 'PopoverContentInner',
})

export const PopoverContent: React.ComponentType<
  PopoverContentProps & React.RefAttributes<PopoverContentElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(PopoverContentInner, { ...props, ref })
})

PopoverContent.displayName = 'PopoverContent'

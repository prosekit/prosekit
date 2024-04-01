import { createComponent } from '@lit/react'
import { PopoverTrigger as PopoverTriggerElement, type PopoverTriggerProps as PopoverTriggerElementProps } from '@prosekit/lit/popover-trigger'
import React from 'react'

import {type PropsWithClassName} from '../types'

export type PopoverTriggerProps = React.PropsWithChildren<PropsWithClassName<PopoverTriggerElementProps>>

const PopoverTriggerInner = createComponent({
  tagName: 'prosekit-popover-trigger',
  elementClass: PopoverTriggerElement,
  react: React,
  displayName: 'PopoverTriggerInner',
})

export const PopoverTrigger: React.ComponentType<
  PopoverTriggerProps & React.RefAttributes<PopoverTriggerElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(PopoverTriggerInner, { ...props, ref })
})

PopoverTrigger.displayName = 'PopoverTrigger'

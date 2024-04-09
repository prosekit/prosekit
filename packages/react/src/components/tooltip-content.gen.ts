import { createComponent } from '@lit/react'
import { TooltipContent as TooltipContentElement, type TooltipContentProps as TooltipContentElementProps } from '@prosekit/lit/tooltip-content'
import React from 'react'

import {type PropsWithClassName} from '../types'

export type TooltipContentProps = React.PropsWithChildren<PropsWithClassName<TooltipContentElementProps>>

const TooltipContentInner = createComponent({
  tagName: 'prosekit-tooltip-content',
  elementClass: TooltipContentElement,
  react: React,
  displayName: 'TooltipContentInner',
})

export const TooltipContent: React.ComponentType<
  TooltipContentProps & React.RefAttributes<TooltipContentElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(TooltipContentInner, { ...props, ref })
})

TooltipContent.displayName = 'TooltipContent'

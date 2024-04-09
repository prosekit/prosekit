import { createComponent } from '@lit/react'
import { TooltipRoot as TooltipRootElement, type TooltipRootProps as TooltipRootElementProps } from '@prosekit/lit/tooltip-root'
import React from 'react'

import {type PropsWithClassName} from '../types'

export type TooltipRootProps = React.PropsWithChildren<PropsWithClassName<TooltipRootElementProps>>

const TooltipRootInner = createComponent({
  tagName: 'prosekit-tooltip-root',
  elementClass: TooltipRootElement,
  react: React,
  displayName: 'TooltipRootInner',
})

export const TooltipRoot: React.ComponentType<
  TooltipRootProps & React.RefAttributes<TooltipRootElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(TooltipRootInner, { ...props, ref })
})

TooltipRoot.displayName = 'TooltipRoot'

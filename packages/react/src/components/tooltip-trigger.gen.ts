import { createComponent } from '@lit/react'
import { TooltipTrigger as TooltipTriggerElement, type TooltipTriggerProps as TooltipTriggerElementProps } from '@prosekit/lit/tooltip-trigger'
import React from 'react'

import {type PropsWithClassName} from '../types'

export type TooltipTriggerProps = React.PropsWithChildren<PropsWithClassName<TooltipTriggerElementProps>>

const TooltipTriggerInner = createComponent({
  tagName: 'prosekit-tooltip-trigger',
  elementClass: TooltipTriggerElement,
  react: React,
  displayName: 'TooltipTriggerInner',
})

export const TooltipTrigger: React.ComponentType<
  TooltipTriggerProps & React.RefAttributes<TooltipTriggerElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(TooltipTriggerInner, { ...props, ref })
})

TooltipTrigger.displayName = 'TooltipTrigger'

import { createComponent } from '@lit/react'
import { Resizable as ResizableElement, type ResizableProps as ResizableElementProps } from '@prosekit/lit/resizable'
import React from 'react'

import {type PropsWithClassName} from '../types'

export type ResizableProps = React.PropsWithChildren<PropsWithClassName<ResizableElementProps>>

const ResizableInner = createComponent({
  tagName: 'prosekit-resizable',
  elementClass: ResizableElement,
  react: React,
  displayName: 'ResizableInner',
})

export const Resizable: React.ComponentType<
  ResizableProps & React.RefAttributes<ResizableElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(ResizableInner, { ...props, ref })
})

Resizable.displayName = 'Resizable'

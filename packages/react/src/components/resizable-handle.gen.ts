import { createComponent } from '@lit/react'
import { ResizableHandle as ResizableHandleElement, type ResizableHandleProps as ResizableHandleElementProps } from '@prosekit/lit/resizable-handle'
import React from 'react'

import {type PropsWithClassName} from '../types'

export type ResizableHandleProps = React.PropsWithChildren<PropsWithClassName<ResizableHandleElementProps>>

const ResizableHandleInner = createComponent({
  tagName: 'prosekit-resizable-handle',
  elementClass: ResizableHandleElement,
  react: React,
  displayName: 'ResizableHandleInner',
})

export const ResizableHandle: React.ComponentType<
  ResizableHandleProps & React.RefAttributes<ResizableHandleElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(ResizableHandleInner, { ...props, ref })
})

ResizableHandle.displayName = 'ResizableHandle'

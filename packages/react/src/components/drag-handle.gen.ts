import { createComponent } from '@lit/react'
import { DragHandle as DragHandleElement, type DragHandleProps as DragHandleElementProps } from '@prosekit/lit/drag-handle'
import React from 'react'

import {type PropsWithClassName} from '../types'

export type DragHandleProps = React.PropsWithChildren<PropsWithClassName<DragHandleElementProps>>

const DragHandleInner = createComponent({
  tagName: 'prosekit-drag-handle',
  elementClass: DragHandleElement,
  react: React,
  displayName: 'DragHandleInner',
})

export const DragHandle: React.ComponentType<
  DragHandleProps & React.RefAttributes<DragHandleElement>
> = React.forwardRef((props, ref) => {
  return React.createElement(DragHandleInner, { ...props, ref })
})

DragHandle.displayName = 'DragHandle'

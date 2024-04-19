import {
  ResizableHandleElement,
  defaultResizableHandleProps,
  type ResizableHandleProps,
} from '@prosekit/primitives/resizable'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'

export const ResizableHandle: ForwardRefExoticComponent<
  RefAttributes<ResizableHandleElement> &
    ResizableHandleProps &
    HTMLAttributes<ResizableHandleElement>
> = createComponent<ResizableHandleProps, ResizableHandleElement>(
  'resizable-handle-v2',
  'ResizableHandle',
  defaultResizableHandleProps,
)

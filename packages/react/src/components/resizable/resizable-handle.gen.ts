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
  Partial<ResizableHandleProps> &
  RefAttributes<ResizableHandleElement> &
  HTMLAttributes<ResizableHandleElement>
> = createComponent<
  ResizableHandleProps, 
  ResizableHandleElement
>(
  'prosekit-resizable-handle',
  'ResizableHandle',
  defaultResizableHandleProps,
)

import {
  ResizableHandleElement,
  defaultResizableHandleProps,
  type ResizableHandleProps,
} from '@prosekit/web/resizable'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

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

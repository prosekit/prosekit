import {
  ResizableRootElement,
  defaultResizableRootProps,
  type ResizableRootProps,
} from '@prosekit/primitives/resizable'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'

export const ResizableRoot: ForwardRefExoticComponent<
  Partial<ResizableRootProps> &
  RefAttributes<ResizableRootElement> &
  HTMLAttributes<ResizableRootElement>
> = createComponent<
  ResizableRootProps, 
  ResizableRootElement
>(
  'prosekit-resizable-root',
  'ResizableRoot',
  defaultResizableRootProps,
)

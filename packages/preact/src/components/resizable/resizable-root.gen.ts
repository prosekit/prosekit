import {
  defaultResizableRootProps,
  type ResizableRootElement,
  type ResizableRootProps,
} from '@prosekit/web/resizable'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

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

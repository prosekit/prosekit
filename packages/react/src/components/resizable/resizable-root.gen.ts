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
  RefAttributes<ResizableRootElement> &
    ResizableRootProps &
    HTMLAttributes<ResizableRootElement>
> = createComponent<ResizableRootProps, ResizableRootElement>(
  'resizable-root-v2',
  'ResizableRoot',
  defaultResizableRootProps,
)

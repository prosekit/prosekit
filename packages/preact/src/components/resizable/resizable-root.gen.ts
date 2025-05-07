import {
  type ResizableRootElement,
  type ResizableRootProps as Props,
  type ResizableRootEvents as Events,
  resizableRootProps,
  resizableRootEvents,
} from '@prosekit/web/resizable'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link ResizableRoot} component.
 */
export interface ResizableRootProps extends Partial<CreateProps<Props, Events>> {}
 
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
  Object.keys(resizableRootProps),
  Object.keys(resizableRootEvents),
)

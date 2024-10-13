import { 
  type ResizableHandleElement,
  type ResizableHandleProps as Props,
  type ResizableHandleEvents as Events,
  resizableHandleProps,
  resizableHandleEvents,
} from '@prosekit/web/resizable'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link ResizableHandle} component.
 */
export interface ResizableHandleProps extends Partial<CreateProps<Props, Events>> {}

export const ResizableHandle = createComponent<
  ResizableHandleProps,
  ResizableHandleElement
>(
  'prosekit-resizable-handle', 
  Object.keys(resizableHandleProps),
  Object.keys(resizableHandleEvents),
)

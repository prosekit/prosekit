import { 
  ResizableHandleElement,
  defaultResizableHandleProps,
  type ResizableHandleProps,
} from '@prosekit/primitives/resizable'

import { createComponent } from '../create-component'

export const ResizableHandle = createComponent<
  ResizableHandleProps,
  ResizableHandleElement
>(
  'prosekit-resizable-handle', 
  defaultResizableHandleProps,
)

import { 
  resizableHandleProps,
  resizableHandleEvents,
  type ResizableHandleElement,
  type ResizableHandleProps,
} from '@prosekit/web/resizable'

import { createComponent } from '../create-component'

export const ResizableHandle = createComponent<
  ResizableHandleProps,
  ResizableHandleElement
>(
  'prosekit-resizable-handle', 
  Object.keys(resizableHandleProps),
  Object.keys(resizableHandleEvents),
)

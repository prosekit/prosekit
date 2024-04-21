import { 
  ResizableHandleElement,
  defaultResizableHandleProps,
  type ResizableHandleProps,
} from '@prosekit/web/resizable'

import { createComponent } from '../create-component'

export const ResizableHandle = createComponent<
  ResizableHandleProps,
  ResizableHandleElement
>(
  'prosekit-resizable-handle', 
  'ResizableHandle',
  defaultResizableHandleProps,
)

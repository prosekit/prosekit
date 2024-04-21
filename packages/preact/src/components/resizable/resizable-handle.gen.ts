import '@prosekit/web/resizable'

import type { 
  ResizableHandleElement,
  ResizableHandleProps,
} from '@prosekit/web/resizable'

import { createComponent } from '../create-component'

export const ResizableHandle = createComponent<
  ResizableHandleProps,
  ResizableHandleElement
>(
  'prosekit-resizable-handle', 
  'ResizableHandle',
)

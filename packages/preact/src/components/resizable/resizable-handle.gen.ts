import '@prosekit/primitives/resizable'

import type { 
  ResizableHandleElement,
  ResizableHandleProps,
} from '@prosekit/primitives/resizable'

import { createComponent } from '../create-component'

export const ResizableHandle = createComponent<
  ResizableHandleProps,
  ResizableHandleElement
>(
  'prosekit-resizable-handle', 
  'ResizableHandle',
)

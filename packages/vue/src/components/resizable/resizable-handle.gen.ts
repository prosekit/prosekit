import { resizableHandleProps, resizableHandleEvents, type ResizableHandleProps, type ResizableHandleEvents } from '@prosekit/web/resizable'

import { createComponent } from '../create-component'

export const ResizableHandle = createComponent<
  ResizableHandleProps,
  ResizableHandleEvents
>(
  'prosekit-resizable-handle',
  'ResizableHandle',
  Object.keys(resizableHandleProps),
  Object.keys(resizableHandleEvents),
)

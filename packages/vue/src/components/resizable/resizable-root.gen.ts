import { resizableRootProps, resizableRootEvents, type ResizableRootProps, type ResizableRootEvents } from '@prosekit/web/resizable'

import { createComponent } from '../create-component'

export const ResizableRoot = createComponent<
  ResizableRootProps,
  ResizableRootEvents
>(
  'prosekit-resizable-root',
  'ResizableRoot',
  Object.keys(resizableRootProps),
  Object.keys(resizableRootEvents),
)

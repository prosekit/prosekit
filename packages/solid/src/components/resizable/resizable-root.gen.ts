import { 
  resizableRootProps,
  resizableRootEvents,
  type ResizableRootElement,
  type ResizableRootProps,
} from '@prosekit/web/resizable'

import { createComponent } from '../create-component'

export const ResizableRoot = createComponent<
  ResizableRootProps,
  ResizableRootElement
>(
  'prosekit-resizable-root', 
  Object.keys(resizableRootProps),
  Object.keys(resizableRootEvents),
)

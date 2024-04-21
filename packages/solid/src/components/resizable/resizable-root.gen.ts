import { 
  ResizableRootElement,
  defaultResizableRootProps,
  type ResizableRootProps,
} from '@prosekit/web/resizable'

import { createComponent } from '../create-component'

export const ResizableRoot = createComponent<
  ResizableRootProps,
  ResizableRootElement
>(
  'prosekit-resizable-root', 
  'ResizableRoot',
  defaultResizableRootProps,
)

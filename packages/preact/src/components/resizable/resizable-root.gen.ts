import '@prosekit/web/resizable'

import type { 
  ResizableRootElement,
  ResizableRootProps,
} from '@prosekit/web/resizable'

import { createComponent } from '../create-component'

export const ResizableRoot = createComponent<
  ResizableRootProps,
  ResizableRootElement
>(
  'prosekit-resizable-root', 
  'ResizableRoot',
)

import '@prosekit/primitives/resizable'

import type { 
  ResizableRootElement,
  ResizableRootProps,
} from '@prosekit/primitives/resizable'

import { createComponent } from '../create-component'

export const ResizableRoot = createComponent<
  ResizableRootProps,
  ResizableRootElement
>(
  'prosekit-resizable-root', 
  'ResizableRoot',
)

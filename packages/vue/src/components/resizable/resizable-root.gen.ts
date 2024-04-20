import { defaultResizableRootProps, type ResizableRootProps } from '@prosekit/primitives/resizable'

import { createComponent } from '../create-component'

export const ResizableRoot = createComponent<ResizableRootProps>('prosekit-resizable-root', 'ResizableRoot', defaultResizableRootProps)

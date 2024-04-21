import { defaultResizableHandleProps, type ResizableHandleProps } from '@prosekit/web/resizable'

import { createComponent } from '../create-component'

export const ResizableHandle = createComponent<ResizableHandleProps>('prosekit-resizable-handle', 'ResizableHandle', defaultResizableHandleProps)

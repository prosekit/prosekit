import {
  resizableRootProps,
  resizableRootEvents,
  type ResizableRootProps as Props,
  type ResizableRootEvents as Events,
} from '@prosekit/web/resizable'

import { createComponent } from '../create-component'

/**
 * Props for the {@link ResizableRoot} component.
 */
export interface ResizableRootProps extends Partial<Props> {}

/**
 * Events for the {@link ResizableRoot} component.
 */
export interface ResizableRootEvents extends Partial<Events> {}

export const ResizableRoot = createComponent<
  ResizableRootProps,
  ResizableRootEvents
>(
  'prosekit-resizable-root',
  'ResizableRoot',
  Object.keys(resizableRootProps),
  Object.keys(resizableRootEvents),
)

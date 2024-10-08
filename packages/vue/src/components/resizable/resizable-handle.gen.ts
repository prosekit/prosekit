import {
  resizableHandleProps,
  resizableHandleEvents,
  type ResizableHandleProps as Props,
  type ResizableHandleEvents as Events,
} from '@prosekit/web/resizable'

import { createComponent } from '../create-component'

/**
 * Props for the {@link ResizableHandle} component.
 */
export interface ResizableHandleProps extends Partial<Props> {}

/**
 * Events for the {@link ResizableHandle} component.
 */
export interface ResizableHandleEvents extends Partial<Events> {}

export const ResizableHandle = createComponent<
  ResizableHandleProps,
  ResizableHandleEvents
>(
  'prosekit-resizable-handle',
  'ResizableHandle',
  Object.keys(resizableHandleProps),
  Object.keys(resizableHandleEvents),
)

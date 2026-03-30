import {
  type ResizableHandleElement,
  type ResizableHandleProps as Props,
  type ResizableHandleEvents as Events,
  resizableHandleProps,
  resizableHandleEvents,
} from '@prosekit/web/resizable'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component.ts'
import type { CreateProps } from '../create-props.ts'

/**
 * Props for the {@link ResizableHandle} component.
 */
export interface ResizableHandleProps extends Partial<CreateProps<Props, Events>> {}

export const ResizableHandle: ForwardRefExoticComponent<
  Partial<ResizableHandleProps> &
  RefAttributes<ResizableHandleElement> &
  HTMLAttributes<ResizableHandleElement>
> = createComponent<
  ResizableHandleProps,
  ResizableHandleElement
>(
  'prosekit-resizable-handle',
  'ResizableHandle',
  Object.keys(resizableHandleProps),
  Object.keys(resizableHandleEvents),
)

import {
  resizableHandleProps,
  resizableHandleEvents,
  type ResizableHandleProps as Props,
  type ResizableHandleEvents as Events,
} from '@prosekit/web/resizable'
import type { DefineSetupFnComponent, HTMLAttributes } from 'vue'

import { createComponent } from '../create-component.ts'
import type { CreateEmits } from '../create-emits.ts'

/**
 * Props for the {@link ResizableHandle} component.
 */
export interface ResizableHandleProps extends Partial<Props> {}

/**
 * Emits for the {@link ResizableHandle} component.
 */
export interface ResizableHandleEmits extends CreateEmits<Events> {}

export const ResizableHandle: DefineSetupFnComponent<
  ResizableHandleProps & HTMLAttributes,
  ResizableHandleEmits
> = createComponent<
  ResizableHandleProps,
  ResizableHandleEmits
>(
  'prosekit-resizable-handle',
  'ResizableHandle',
  Object.keys(resizableHandleProps),
  Object.keys(resizableHandleEvents),
)

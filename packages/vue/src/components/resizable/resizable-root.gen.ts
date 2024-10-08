import {
  resizableRootProps,
  resizableRootEvents,
  type ResizableRootProps as Props,
  type ResizableRootEvents as Events,
} from '@prosekit/web/resizable'

import { createComponent } from '../create-component'
import type { CreateEmits } from '../create-emits'

/**
 * Props for the {@link ResizableRoot} component.
 */
export interface ResizableRootProps extends Partial<Props> {}

/**
 * Emits for the {@link ResizableRoot} component.
 */
export interface ResizableRootEmits extends CreateEmits<Events> {}

export const ResizableRoot: DefineSetupFnComponent<
  ResizableRootProps & HTMLAttributes,
  ResizableRootEmits
> = createComponent<
  ResizableRootProps,
  ResizableRootEmits
>(
  'prosekit-resizable-root',
  'ResizableRoot',
  Object.keys(resizableRootProps),
  Object.keys(resizableRootEvents),
)

import {
  dropIndicatorProps,
  dropIndicatorEvents,
  type DropIndicatorProps as Props,
  type DropIndicatorEvents as Events,
} from '@prosekit/web/drop-indicator'
import type { DefineSetupFnComponent, HTMLAttributes } from 'vue'

import { createComponent } from '../create-component'
import type { CreateEmits } from '../create-emits'

/**
 * Props for the {@link DropIndicator} component.
 */
export interface DropIndicatorProps extends Partial<Props> {}

/**
 * Emits for the {@link DropIndicator} component.
 */
export interface DropIndicatorEmits extends CreateEmits<Events> {}

export const DropIndicator: DefineSetupFnComponent<
  DropIndicatorProps & HTMLAttributes,
  DropIndicatorEmits
> = createComponent<
  DropIndicatorProps,
  DropIndicatorEmits
>(
  'prosekit-drop-indicator',
  'DropIndicator',
  Object.keys(dropIndicatorProps),
  Object.keys(dropIndicatorEvents),
)

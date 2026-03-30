import {
  type DropIndicatorElement,
  type DropIndicatorProps as Props,
  type DropIndicatorEvents as Events,
  dropIndicatorProps,
  dropIndicatorEvents,
} from '@prosekit/web/drop-indicator'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component.ts'
import type { CreateProps } from '../create-props.ts'

/**
 * Props for the {@link DropIndicator} component.
 */
export interface DropIndicatorProps extends Partial<CreateProps<Props, Events>> {}

export const DropIndicator: ForwardRefExoticComponent<
  Partial<DropIndicatorProps> &
  RefAttributes<DropIndicatorElement> &
  HTMLAttributes<DropIndicatorElement>
> = createComponent<
  DropIndicatorProps,
  DropIndicatorElement
>(
  'prosekit-drop-indicator',
  'DropIndicator',
  Object.keys(dropIndicatorProps),
  Object.keys(dropIndicatorEvents),
)

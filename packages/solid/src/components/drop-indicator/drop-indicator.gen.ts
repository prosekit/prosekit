import { 
  type DropIndicatorElement,
  type DropIndicatorProps as Props,
  type DropIndicatorEvents as Events,
  dropIndicatorProps,
  dropIndicatorEvents,
} from '@prosekit/web/drop-indicator'
import type { Component } from 'solid-js'

import type { PropsWithElement } from '../../types'
import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link DropIndicator} component.
 */
export interface DropIndicatorProps extends Partial<CreateProps<Props, Events>> {}

export const DropIndicator: Component<PropsWithElement<
  DropIndicatorProps,
  DropIndicatorElement
>> = createComponent<
  DropIndicatorProps,
  DropIndicatorElement
>(
  'prosekit-drop-indicator', 
  Object.keys(dropIndicatorProps),
  Object.keys(dropIndicatorEvents),
)

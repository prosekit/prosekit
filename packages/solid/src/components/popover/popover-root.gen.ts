import { 
  type PopoverRootElement,
  type PopoverRootProps as Props,
  type PopoverRootEvents as Events,
  popoverRootProps,
  popoverRootEvents,
} from '@prosekit/web/popover'
import type { Component } from 'solid-js'

import type { PropsWithElement } from '../../types'
import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link PopoverRoot} component.
 */
export interface PopoverRootProps extends Partial<CreateProps<Props, Events>> {}

export const PopoverRoot: Component<PropsWithElement<
  PopoverRootProps,
  PopoverRootElement
>> = createComponent<
  PopoverRootProps,
  PopoverRootElement
>(
  'prosekit-popover-root', 
  Object.keys(popoverRootProps),
  Object.keys(popoverRootEvents),
)

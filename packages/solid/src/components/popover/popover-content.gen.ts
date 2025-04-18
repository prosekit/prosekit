import { 
  type PopoverContentElement,
  type PopoverContentProps as Props,
  type PopoverContentEvents as Events,
  popoverContentProps,
  popoverContentEvents,
} from '@prosekit/web/popover'
import type { Component } from 'solid-js'

import type { PropsWithElement } from '../../types'
import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link PopoverContent} component.
 */
export interface PopoverContentProps extends Partial<CreateProps<Props, Events>> {}

export const PopoverContent: Component<PropsWithElement<
  PopoverContentProps,
  PopoverContentElement
>> = createComponent<
  PopoverContentProps,
  PopoverContentElement
>(
  'prosekit-popover-content', 
  Object.keys(popoverContentProps),
  Object.keys(popoverContentEvents),
)

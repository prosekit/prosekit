import {
  type PopoverContentElement,
  type PopoverContentProps as Props,
  type PopoverContentEvents as Events,
  popoverContentProps,
  popoverContentEvents,
} from '@prosekit/web/popover'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

export type PopoverContentProps = CreateProps<Props, Events>
 
export const PopoverContent: ForwardRefExoticComponent<
  Partial<PopoverContentProps> &
  RefAttributes<PopoverContentElement> &
  HTMLAttributes<PopoverContentElement>
> = createComponent<
  PopoverContentProps, 
  PopoverContentElement
>(
  'prosekit-popover-content',
  'PopoverContent',
  Object.keys(popoverContentProps),
  Object.keys(popoverContentEvents),
)

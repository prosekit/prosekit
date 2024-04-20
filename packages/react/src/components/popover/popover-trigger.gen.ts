import {
  PopoverTriggerElement,
  defaultPopoverTriggerProps,
  type PopoverTriggerProps,
} from '@prosekit/primitives/popover'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'

export const PopoverTrigger: ForwardRefExoticComponent<
  Partial<PopoverTriggerProps> &
  RefAttributes<PopoverTriggerElement> &
  HTMLAttributes<PopoverTriggerElement>
> = createComponent<
  PopoverTriggerProps, 
  PopoverTriggerElement
>(
  'prosekit-popover-trigger',
  'PopoverTrigger',
  defaultPopoverTriggerProps,
)

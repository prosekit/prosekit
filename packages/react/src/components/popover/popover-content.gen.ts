import {
  PopoverContentElement,
  defaultPopoverContentProps,
  type PopoverContentProps,
} from '@prosekit/primitives/popover'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'

export const PopoverContent: ForwardRefExoticComponent<
  Partial<PopoverContentProps> &
  RefAttributes<PopoverContentElement> &
  HTMLAttributes<PopoverContentElement>
> = createComponent<
  PopoverContentProps, 
  PopoverContentElement
>(
  'popover-content-v2',
  'PopoverContent',
  defaultPopoverContentProps,
)

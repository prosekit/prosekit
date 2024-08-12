import {
  defaultPopoverContentProps,
  type PopoverContentElement,
  type PopoverContentProps
} from '@prosekit/web/popover'
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
  'prosekit-popover-content',
  'PopoverContent',
  defaultPopoverContentProps,
)

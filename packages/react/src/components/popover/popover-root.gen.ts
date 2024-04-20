import {
  PopoverRootElement,
  defaultPopoverRootProps,
  type PopoverRootProps,
} from '@prosekit/primitives/popover'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'

export const PopoverRoot: ForwardRefExoticComponent<
  Partial<PopoverRootProps> &
  RefAttributes<PopoverRootElement> &
  HTMLAttributes<PopoverRootElement>
> = createComponent<
  PopoverRootProps, 
  PopoverRootElement
>(
  'prosekit-popover-root',
  'PopoverRoot',
  defaultPopoverRootProps,
)

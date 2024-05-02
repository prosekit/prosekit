import {
  PopoverRootElement,
  defaultPopoverRootProps,
  type PopoverRootProps,
} from '@prosekit/web/popover'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

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

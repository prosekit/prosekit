import {
  type PopoverRootElement,
  type PopoverRootProps as Props,
  type PopoverRootEvents as Events,
  popoverRootProps,
  popoverRootEvents,
} from '@prosekit/web/popover'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

export type PopoverRootProps = CreateProps<Props, Events>
 
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
  Object.keys(popoverRootProps),
  Object.keys(popoverRootEvents),
)

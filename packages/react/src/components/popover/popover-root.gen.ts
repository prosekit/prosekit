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
} from 'react'

import { createComponent } from '../create-component.ts'
import type { CreateProps } from '../create-props.ts'

/**
 * Props for the {@link PopoverRoot} component.
 */
export interface PopoverRootProps extends Partial<CreateProps<Props, Events>> {}

export const PopoverRoot: ForwardRefExoticComponent<
  PopoverRootProps &
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

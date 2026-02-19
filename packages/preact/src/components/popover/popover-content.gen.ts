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
} from 'preact/compat'

import { createComponent } from '../create-component.ts'
import type { CreateProps } from '../create-props.ts'

/**
 * Props for the {@link PopoverContent} component.
 */
export interface PopoverContentProps extends Partial<CreateProps<Props, Events>> {}

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

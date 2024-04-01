import {
  PopoverContentElement,
  defaultPopoverContentProps,
  type PopoverContentProps as PopoverContentElementProps,
} from '@aria-ui/popover'

import { defineCustomElement } from '../../utils/define-custom-element'

export { PopoverContentElement as PopoverContent }

export type PopoverContentProps = Partial<PopoverContentElementProps>

export const propNames = Object.keys(
  defaultPopoverContentProps,
) as (keyof PopoverContentProps)[]

defineCustomElement('prosekit-popover-content', PopoverContentElement)

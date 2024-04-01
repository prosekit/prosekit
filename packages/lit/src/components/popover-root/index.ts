import {
  PopoverRootElement,
  defaultPopoverRootProps,
  type PopoverRootProps as PopoverRootElementProps,
} from '@aria-ui/popover'

import { defineCustomElement } from '../../utils/define-custom-element'

export { PopoverRootElement as PopoverRoot }

export type PopoverRootProps = Partial<PopoverRootElementProps>

export const propNames = Object.keys(
  defaultPopoverRootProps,
) as (keyof PopoverRootProps)[]

defineCustomElement('prosekit-popover-root', PopoverRootElement)

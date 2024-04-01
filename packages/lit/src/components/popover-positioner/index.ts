import {
  PopoverPositionerElement,
  defaultPopoverPositionerProps,
  type PopoverPositionerProps as PopoverPositionerElementProps,
} from '@aria-ui/popover'

import { defineCustomElement } from '../../utils/define-custom-element'

export { PopoverPositionerElement as PopoverPositioner }

export type PopoverPositionerProps = Partial<PopoverPositionerElementProps>

export const propNames = Object.keys(
  defaultPopoverPositionerProps,
) as (keyof PopoverPositionerProps)[]

defineCustomElement('prosekit-popover-positioner', PopoverPositionerElement)

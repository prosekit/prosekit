import { offset, shift } from '@floating-ui/dom'

import { type PopoverOptions } from './options'

export const defaultPopoverOptions: PopoverOptions = {
  placement: 'bottom',
  middleware: [offset(4), shift({ padding: 8 })],
}

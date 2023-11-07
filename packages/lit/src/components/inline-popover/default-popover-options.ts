import { inline, offset, shift } from '@floating-ui/dom'

import { type PopoverOptions } from '../popover/options'

/**
 * Default popover options.
 */
export const defaultPopoverOptions: PopoverOptions = {
  placement: 'top',
  strategy: 'absolute',
  middleware: [
    inline(),

    offset(8),

    shift({ mainAxis: true, crossAxis: true, padding: 8 }),
  ],
}

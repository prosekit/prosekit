import { offset, shift, size } from '@floating-ui/dom'

import { type PopoverOptions } from './options'

export const defaultPopoverOptions: PopoverOptions = {
  placement: 'bottom',
  middleware: [
    offset({ mainAxis: 8, crossAxis: 8 }),
    shift({ padding: 8 }),
    size({
      apply: ({ availableWidth, availableHeight, elements }) => {
        elements.floating.style.setProperty(
          'max-width',
          `${Math.floor(availableWidth)}px`,
        )

        elements.floating.style.setProperty(
          'max-height',
          `${Math.floor(availableHeight)}px`,
        )
      },
      padding: 8,
    }),
  ],
}

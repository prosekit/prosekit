import {
  offset,
  shift,
  size,
  type DetectOverflowOptions,
} from '@floating-ui/dom'

import { boundary } from '../../utils/popover-api'

import { type PopoverOptions } from './options'

const defaultDetectOverflowOptions = {
  padding: 8,
  boundary,
} satisfies DetectOverflowOptions

export const defaultPopoverOptions: PopoverOptions = {
  placement: 'bottom',
  middleware: [
    offset({ mainAxis: 8, crossAxis: 8 }),
    shift({ ...defaultDetectOverflowOptions }),
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
      ...defaultDetectOverflowOptions,
    }),
  ],
}

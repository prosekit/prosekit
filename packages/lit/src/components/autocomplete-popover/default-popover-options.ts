import {
  type DetectOverflowOptions,
  flip,
  inline,
  offset,
  shift,
  size,
} from '@floating-ui/dom'

import { boundary } from '../../utils/popover-api'
import { type PopoverOptions } from '../popover/options'

const defaultDetectOverflowOptions = {
  padding: 8,
  boundary,
} satisfies DetectOverflowOptions

/**
 * Default popover options.
 */
export const defaultPopoverOptions: PopoverOptions = {
  // The main axis is the y axis, and we place the popover at the bottom of the
  // reference element.
  //
  // The cross axis is the x axis, and we place the popover at the start of the
  // reference element. The reference element and the popover are left-aligned.
  placement: 'bottom-start',

  middleware: [
    // Use the text caret as the reference point
    inline(),

    offset({
      // Move down the popover by 4px
      mainAxis: 4,
    }),

    // Flip the popover to the top if it's overflowing the viewport
    //
    // When `flipAlignment` is true, which is the default, ensure `flip() `is
    // placed before `shift()` in your middleware array.
    //
    // https://floating-ui.com/docs/flip#flipalignment
    flip({
      // Flip the popover to the top if necessary.
      mainAxis: true,

      // We don't want to flip the popover to the left or right, since `shift()`
      // will handle this.
      crossAxis: false,

      ...defaultDetectOverflowOptions,
    }),

    // We need to place `shift()` after `flip()`. See https://floating-ui.com/docs/flip#flipalignment
    shift({
      ...defaultDetectOverflowOptions,
    }),

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

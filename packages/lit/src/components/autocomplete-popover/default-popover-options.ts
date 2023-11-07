import {
  type DetectOverflowOptions,
  flip,
  inline,
  offset,
  shift,
  size,
} from '@floating-ui/dom'

import { type PopoverOptions } from '../popover/options'

const defaultDetectOverflowOptions = {
  // Make sure the popover is always at least 8px away from the boundary
  padding: 8,
} satisfies DetectOverflowOptions

/**
 * Default popover options.
 */
export const defaultPopoverOptions: PopoverOptions = {
  placement: 'bottom-end',
  middleware: [
    // Use the text caret as the reference point
    inline(),

    offset(({ rects }) => ({
      // Put the popover at the bottom right corner
      alignmentAxis: -rects.floating.width,
      // Move down the popover by 4px
      mainAxis: 4,
    })),

    // Flip the popover to the top if it's overflowing the viewport
    flip({
      fallbackStrategy: 'initialPlacement',
      fallbackAxisSideDirection: 'start',
      crossAxis: false,
      ...defaultDetectOverflowOptions,
    }),

    size({
      apply: ({ availableWidth, availableHeight, elements }) => {
        elements.floating.style.setProperty(
          '--prosekit-popover-available-width',
          `${Math.floor(availableWidth)}px`,
        )

        elements.floating.style.setProperty(
          '--prosekit-popover-available-height',
          `${Math.floor(availableHeight)}px`,
        )
      },
      ...defaultDetectOverflowOptions,
    }),

    shift({
      ...defaultDetectOverflowOptions,
    }),
  ],
}

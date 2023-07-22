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
    offset(({ rects }) => ({
      // Put the popover at the bottom right corner
      alignmentAxis: -rects.floating.width,
      // Move down the popover by 4px
      mainAxis: 4,
    })),

    size({
      apply: ({ availableHeight, elements }) => {
        const style = {
          // Minimum acceptable height is 100px.
          // `flip` will then take over.
          maxHeight: `${Math.max(100, availableHeight)}px`,

          overflowY: 'auto',
        } satisfies Partial<CSSStyleDeclaration>

        Object.assign(elements.floating.style, style)
      },
      ...defaultDetectOverflowOptions,
    }),

    // Flip the popover to the top if it's overflowing the viewport
    flip({
      fallbackStrategy: 'initialPlacement',
      fallbackAxisSideDirection: 'start',
      crossAxis: false,
      ...defaultDetectOverflowOptions,
    }),

    shift({
      ...defaultDetectOverflowOptions,
    }),

    // Use the text caret as the reference point
    inline(),
  ],
}

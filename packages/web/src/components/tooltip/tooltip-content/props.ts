import type { TooltipContentProps } from '@aria-ui/tooltip'
import { defaultTooltipContentProps as defaultProps } from '@aria-ui/tooltip'

export type { TooltipContentProps }

export const defaultTooltipContentProps = {
  ...defaultProps,
  shift: true,
  flip: true,
  offset: 6,
  overflowPadding: 4,
  // Don't need boundary when hoist is true.
  hoist: true,
  boundary: [],
} satisfies TooltipContentProps

import {
  type TooltipContentProps as Props,
  type TooltipContentEvents as Events,
  tooltipContentProps as props,
  tooltipContentEvents,
} from '@aria-ui/tooltip'

export interface TooltipContentProps extends Props {}

export const tooltipContentProps = {
  ...props,
  shift: { default: true },
  flip: { default: true },
  offset: { default: 6 },
  overflowPadding: { default: 4 },
  // Don't need boundary when hoist is true.
  hoist: { default: true },
  boundary: { default: [] },
}

export interface TooltipContentEvents extends Events {}

export { tooltipContentEvents }

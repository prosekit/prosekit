import {
  type BlockPopoverProps,
  defaultBlockPopoverProps,
} from '../block-popover/props'

export interface BlockHandlePopoverProps extends BlockPopoverProps {}

export const defaultBlockHandlePopoverProps = Object.freeze({
  ...defaultBlockPopoverProps,
}) satisfies BlockHandlePopoverProps

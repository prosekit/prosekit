import {
  defaultBlockPopoverProps,
  type BlockPopoverProps as _BlockPopoverProps,
} from './props'

export { blockPopoverContext, type BlockPopoverContext } from './context'
export { BlockPopover } from './element'
export { defaultBlockPopoverProps } from './props'

export const propNames = Object.keys(defaultBlockPopoverProps) as Array<
  keyof BlockPopoverProps
>

export type BlockPopoverProps = Partial<_BlockPopoverProps>

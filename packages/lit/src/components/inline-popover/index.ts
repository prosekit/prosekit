import {
  defaultInlinePopoverProps,
  type InlinePopoverProps as _InlinePopoverProps,
} from './props'

export { InlinePopover } from './element'
export { defaultInlinePopoverProps } from './props'

export const propNames = Object.keys(defaultInlinePopoverProps) as Array<
  keyof InlinePopoverProps
>

export type InlinePopoverProps = Partial<_InlinePopoverProps>

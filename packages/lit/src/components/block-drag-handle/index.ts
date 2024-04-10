import { defaultBlockDragHandleProps, type BlockDragHandleProps } from './props'

export { BlockDragHandle } from './element'
export { type BlockDragHandleProps, defaultBlockDragHandleProps } from './props'

export const propNames = Object.keys(defaultBlockDragHandleProps) as Array<
  keyof BlockDragHandleProps
>

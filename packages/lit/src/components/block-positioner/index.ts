import {
  defaultBlockPositionerProps,
  type BlockPositionerProps as _BlockPositionerProps,
} from './props'

export { blockPositionerContext, type BlockPositionerContext } from './context'
export { BlockPositioner } from './element'
export { defaultBlockPositionerProps } from './props'

export const propNames = Object.keys(defaultBlockPositionerProps) as Array<
  keyof BlockPositionerProps
>

export type BlockPositionerProps = Partial<_BlockPositionerProps>

import {
  defaultResizableHandleProps,
  type ResizableHandleProps as _ResizableHandleProps,
} from './props'

export { ResizableHandle } from './element'
export { defaultResizableHandleProps } from './props'

export const propNames = Object.keys(defaultResizableHandleProps) as Array<
  keyof ResizableHandleProps
>

export type ResizableHandleProps = Partial<_ResizableHandleProps>

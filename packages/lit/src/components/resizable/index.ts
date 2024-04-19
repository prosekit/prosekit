import {
  defaultResizableProps,
  type ResizableProps as _ResizableProps,
} from './props'

export { Resizable } from './element'
export { defaultResizableProps } from './props'

export const propNames = Object.keys(defaultResizableProps) as Array<
  keyof ResizableProps
>

export type ResizableProps = Partial<_ResizableProps>

import '@prosekit/lit/resizable-handle'
import type { ResizableHandleProps as ResizableHandleElementProps } from '@prosekit/lit/resizable-handle'
import type { ComponentType } from 'preact'
import { h } from 'preact'

import type { PropsWithClass, PropsWithChildren } from '../types'

export type ResizableHandleProps = PropsWithChildren<PropsWithClass<ResizableHandleElementProps>>

export const ResizableHandle: ComponentType<ResizableHandleProps> = (props) => {
  return h('prosekit-resizable-handle', props)
}

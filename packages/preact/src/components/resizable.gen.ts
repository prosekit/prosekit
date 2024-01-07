import '@prosekit/lit/resizable'
import type { ResizableProps as ResizableElementProps } from '@prosekit/lit/resizable'
import type { ComponentType } from 'preact'
import { h } from 'preact'

import type { PropsWithClass, PropsWithChildren } from '../types'

export type ResizableProps = PropsWithChildren<PropsWithClass<ResizableElementProps>>

export const Resizable: ComponentType<ResizableProps> = (props) => {
  return h('prosekit-resizable', props)
}

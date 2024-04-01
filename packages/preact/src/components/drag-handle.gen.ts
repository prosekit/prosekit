import '@prosekit/lit/drag-handle'
import type { DragHandleProps as DragHandleElementProps } from '@prosekit/lit/drag-handle'
import type { ComponentType } from 'preact'
import { h } from 'preact'

import type { PropsWithClass, PropsWithChildren } from '../types'

export type DragHandleProps = PropsWithChildren<PropsWithClass<DragHandleElementProps>>

export const DragHandle: ComponentType<DragHandleProps> = (props) => {
  return h('prosekit-drag-handle', props as object)
}

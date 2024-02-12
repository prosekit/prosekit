import '@prosekit/lit/drag-handle'

import type { DragHandleProps as DragHandleElementProps } from '@prosekit/lit/drag-handle'
import type { Component } from 'solid-js'
import html from 'solid-js/html'

import type { PropsWithClass, PropsWithChildren } from '../types'
import { forceProps } from '../utils/force-props'

export type DragHandleProps = PropsWithChildren<PropsWithClass<DragHandleElementProps>>

export const DragHandle: Component<DragHandleProps> = (props) => {
  return html`<prosekit-drag-handle ...${forceProps(props)} />`
}

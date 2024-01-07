import '@prosekit/lit/resizable-handle'

import type { ResizableHandleProps as ResizableHandleElementProps } from '@prosekit/lit/resizable-handle'
import type { Component } from 'solid-js'
import html from 'solid-js/html'

import type { PropsWithClass, PropsWithChildren } from '../types'
import { forceProps } from '../utils/force-props'

export type ResizableHandleProps = PropsWithChildren<PropsWithClass<ResizableHandleElementProps>>

export const ResizableHandle: Component<ResizableHandleProps> = (props) => {
  return html`<prosekit-resizable-handle ...${forceProps(props)} />`
}

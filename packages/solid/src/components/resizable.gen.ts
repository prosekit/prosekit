import '@prosekit/lit/resizable'

import type { ResizableProps as ResizableElementProps } from '@prosekit/lit/resizable'
import type { Component } from 'solid-js'
import html from 'solid-js/html'

import type { PropsWithClass, PropsWithChildren } from '../types'
import { forceProps } from '../utils/force-props'

export type ResizableProps = PropsWithChildren<PropsWithClass<ResizableElementProps>>

export const Resizable: Component<ResizableProps> = (props) => {
  return html`<prosekit-resizable ...${forceProps(props)} />`
}

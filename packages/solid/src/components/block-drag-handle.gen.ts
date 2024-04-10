import '@prosekit/lit/block-drag-handle'

import type { BlockDragHandleProps as BlockDragHandleElementProps } from '@prosekit/lit/block-drag-handle'
import type { Component } from 'solid-js'
import html from 'solid-js/html'

import type { PropsWithClass, PropsWithChildren } from '../types'
import { forceProps } from '../utils/force-props'

export type BlockDragHandleProps = PropsWithChildren<PropsWithClass<BlockDragHandleElementProps>>

export const BlockDragHandle: Component<BlockDragHandleProps> = (props) => {
  return html`<prosekit-block-drag-handle ...${forceProps(props)} />`
}

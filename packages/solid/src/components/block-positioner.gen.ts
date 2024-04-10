import '@prosekit/lit/block-positioner'

import type { BlockPositionerProps as BlockPositionerElementProps } from '@prosekit/lit/block-positioner'
import type { Component } from 'solid-js'
import html from 'solid-js/html'

import type { PropsWithClass, PropsWithChildren } from '../types'
import { forceProps } from '../utils/force-props'

export type BlockPositionerProps = PropsWithChildren<PropsWithClass<BlockPositionerElementProps>>

export const BlockPositioner: Component<BlockPositionerProps> = (props) => {
  return html`<prosekit-block-positioner ...${forceProps(props)} />`
}

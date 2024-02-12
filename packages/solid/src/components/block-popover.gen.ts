import '@prosekit/lit/block-popover'

import type { BlockPopoverProps as BlockPopoverElementProps } from '@prosekit/lit/block-popover'
import type { Component } from 'solid-js'
import html from 'solid-js/html'

import type { PropsWithClass, PropsWithChildren } from '../types'
import { forceProps } from '../utils/force-props'

export type BlockPopoverProps = PropsWithChildren<PropsWithClass<BlockPopoverElementProps>>

export const BlockPopover: Component<BlockPopoverProps> = (props) => {
  return html`<prosekit-block-popover ...${forceProps(props)} />`
}

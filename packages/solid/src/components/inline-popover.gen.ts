import '@prosekit/lit/inline-popover'

import type { InlinePopoverProps as InlinePopoverElementProps } from '@prosekit/lit/inline-popover'
import type { Component } from 'solid-js'
import html from 'solid-js/html'

import type { PropsWithClass, PropsWithChildren } from '../types'
import { forceProps } from '../utils/force-props'

export type InlinePopoverProps = PropsWithChildren<PropsWithClass<InlinePopoverElementProps>>

export const InlinePopover: Component<InlinePopoverProps> = (props) => {
  return html`<prosekit-inline-popover ...${forceProps(props)} />`
}

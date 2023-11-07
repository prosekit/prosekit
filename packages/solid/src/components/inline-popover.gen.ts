/* eslint-disable @typescript-eslint/no-namespace */

import '@prosekit/lit/inline-popover'

import type { InlinePopoverProps as InlinePopoverElementProps } from '@prosekit/lit/inline-popover'
import type { Component, JSXElement } from 'solid-js'
import html from 'solid-js/html'

export type InlinePopoverProps = {
  class?: string
  children?: JSXElement
} & InlinePopoverElementProps

export const InlinePopover: Component<InlinePopoverProps> = (props) => {
  return html`<prosekit-inline-popover ...${props} />`
}

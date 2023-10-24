/* eslint-disable @typescript-eslint/no-namespace */

import '@prosekit/lit/popover'

import type { PopoverProps as PopoverElementProps } from '@prosekit/lit/popover'
import type { Component, JSXElement } from 'solid-js'
import html from 'solid-js/html'

export type PopoverProps = {
  class?: string
  children?: JSXElement
} & PopoverElementProps

export const Popover: Component<PopoverProps> = (props) => {
  return html`<prosekit-popover ...${props} />`
}

/* eslint-disable @typescript-eslint/no-namespace */

import '@prosekit/lit/components/code-block-menu-popover'

import type { CodeBlockMenuPopoverProps as CodeBlockMenuPopoverElementProps } from '@prosekit/lit/components/code-block-menu-popover'
import type { Component, JSXElement } from 'solid-js'
import html from 'solid-js/html'

export type CodeBlockMenuPopoverProps = {
  class?: string
  children?: JSXElement
} & CodeBlockMenuPopoverElementProps

export const CodeBlockMenuPopover: Component<CodeBlockMenuPopoverProps> = (props) => {
  return html`<prosekit-code-block-menu-popover ...${props} />`
}

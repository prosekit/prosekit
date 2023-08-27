/* eslint-disable @typescript-eslint/no-namespace */

import '@prosekit/lit/components/code-block-popover'

import type { CodeBlockPopoverProps as CodeBlockPopoverElementProps } from '@prosekit/lit/components/code-block-popover'
import type { Component, JSXElement } from 'solid-js'
import html from 'solid-js/html'

export type CodeBlockPopoverProps = {
  class?: string
  children?: JSXElement
} & CodeBlockPopoverElementProps

export const CodeBlockPopover: Component<CodeBlockPopoverProps> = (props) => {
  return html`<prosekit-code-block-popover ...${props} />`
}

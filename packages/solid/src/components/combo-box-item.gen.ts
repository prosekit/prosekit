/* eslint-disable @typescript-eslint/no-namespace */

import '@prosekit/lit/components/combo-box-item'

import type { ComboBoxItemProps as ComboBoxItemElementProps } from '@prosekit/lit/components/combo-box-item'
import type { Component, JSXElement } from 'solid-js'
import html from 'solid-js/html'

export type ComboBoxItemProps = {
  class?: string
  children?: JSXElement
} & ComboBoxItemElementProps

export const ComboBoxItem: Component<ComboBoxItemProps> = (props) => {
  return html`<prosekit-combo-box-item ...${props} />`
}

import '@prosekit/lit/combo-box-item'

import type { ComboBoxItemProps as ComboBoxItemElementProps } from '@prosekit/lit/combo-box-item'
import type { Component, JSXElement } from 'solid-js'
import html from 'solid-js/html'

import { forceProps } from '../utils/force-props'

export type ComboBoxItemProps = {
  class?: string
  children?: JSXElement
} & ComboBoxItemElementProps

export const ComboBoxItem: Component<ComboBoxItemProps> = (props) => {
  return html`<prosekit-combo-box-item ...${forceProps(props)} />`
}

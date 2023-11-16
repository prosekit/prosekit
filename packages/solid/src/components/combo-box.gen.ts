import '@prosekit/lit/combo-box'

import type { ComboBoxProps as ComboBoxElementProps } from '@prosekit/lit/combo-box'
import type { Component, JSXElement } from 'solid-js'
import html from 'solid-js/html'

import { forceProps } from '../utils/force-props'

export type ComboBoxProps = {
  class?: string
  children?: JSXElement
} & ComboBoxElementProps

export const ComboBox: Component<ComboBoxProps> = (props) => {
  return html`<prosekit-combo-box ...${forceProps(props)} />`
}

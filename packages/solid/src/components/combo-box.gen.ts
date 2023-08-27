/* eslint-disable @typescript-eslint/no-namespace */

import '@prosekit/lit/components/combo-box'

import type { ComboBoxProps as ComboBoxElementProps } from '@prosekit/lit/components/combo-box'
import type { Component, JSXElement } from 'solid-js'
import html from 'solid-js/html'

export type ComboBoxProps = {
  class?: string
  children?: JSXElement
} & ComboBoxElementProps

export const ComboBox: Component<ComboBoxProps> = (props) => {
  return html`<prosekit-combo-box ...${props} />`
}

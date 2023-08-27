/* eslint-disable @typescript-eslint/no-namespace */

import '@prosekit/lit/components/combo-box-input'

import type { ComboBoxInputProps as ComboBoxInputElementProps } from '@prosekit/lit/components/combo-box-input'
import type { Component, JSXElement } from 'solid-js'
import html from 'solid-js/html'

export type ComboBoxInputProps = {
  class?: string
  children?: JSXElement
} & ComboBoxInputElementProps

export const ComboBoxInput: Component<ComboBoxInputProps> = (props) => {
  return html`<prosekit-combo-box-input ...${props} />`
}

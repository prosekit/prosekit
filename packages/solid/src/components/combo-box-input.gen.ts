import '@prosekit/lit/combo-box-input'

import type { ComboBoxInputProps as ComboBoxInputElementProps } from '@prosekit/lit/combo-box-input'
import type { Component, JSXElement } from 'solid-js'
import html from 'solid-js/html'

import { forceProps } from '../utils/force-props'

export type ComboBoxInputProps = {
  class?: string
  children?: JSXElement
} & ComboBoxInputElementProps

export const ComboBoxInput: Component<ComboBoxInputProps> = (props) => {
  return html`<prosekit-combo-box-input ...${forceProps(props)} />`
}

import '@prosekit/lit/combo-box-list'

import type { ComboBoxListProps as ComboBoxListElementProps } from '@prosekit/lit/combo-box-list'
import type { Component, JSXElement } from 'solid-js'
import html from 'solid-js/html'

import { forceProps } from '../utils/force-props'

export type ComboBoxListProps = {
  class?: string
  children?: JSXElement
} & ComboBoxListElementProps

export const ComboBoxList: Component<ComboBoxListProps> = (props) => {
  return html`<prosekit-combo-box-list ...${forceProps(props)} />`
}

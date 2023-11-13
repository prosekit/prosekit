/* eslint-disable @typescript-eslint/no-namespace */

import '@prosekit/lit/combo-box2'

import type { ComboBox2Props as ComboBox2ElementProps } from '@prosekit/lit/combo-box2'
import type { Component, JSXElement } from 'solid-js'
import html from 'solid-js/html'

export type ComboBox2Props = {
  class?: string
  children?: JSXElement
} & ComboBox2ElementProps

export const ComboBox2: Component<ComboBox2Props> = (props) => {
  return html`<prosekit-combo-box2 ...${props} />`
}

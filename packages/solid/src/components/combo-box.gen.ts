import '@prosekit/lit/combo-box'

import type { ComboBoxProps as ComboBoxElementProps } from '@prosekit/lit/combo-box'
import type { Component } from 'solid-js'
import html from 'solid-js/html'

import type { PropsWithClass, PropsWithChildren } from '../types'
import { forceProps } from '../utils/force-props'

export type ComboBoxProps = PropsWithChildren<PropsWithClass<ComboBoxElementProps>>

export const ComboBox: Component<ComboBoxProps> = (props) => {
  return html`<prosekit-combo-box ...${forceProps(props)} />`
}

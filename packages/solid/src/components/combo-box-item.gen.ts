import '@prosekit/lit/combo-box-item'

import type { ComboBoxItemProps as ComboBoxItemElementProps } from '@prosekit/lit/combo-box-item'
import type { Component } from 'solid-js'
import html from 'solid-js/html'

import type { PropsWithClass, PropsWithChildren } from '../types'
import { forceProps } from '../utils/force-props'

export type ComboBoxItemProps = PropsWithChildren<PropsWithClass<ComboBoxItemElementProps>>

export const ComboBoxItem: Component<ComboBoxItemProps> = (props) => {
  return html`<prosekit-combo-box-item ...${forceProps(props)} />`
}

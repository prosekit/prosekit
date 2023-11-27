import '@prosekit/lit/combo-box-list'

import type { ComboBoxListProps as ComboBoxListElementProps } from '@prosekit/lit/combo-box-list'
import type { Component } from 'solid-js'
import html from 'solid-js/html'

import type { PropsWithClass, PropsWithChildren } from '../types'
import { forceProps } from '../utils/force-props'

export type ComboBoxListProps = PropsWithChildren<PropsWithClass<ComboBoxListElementProps>>

export const ComboBoxList: Component<ComboBoxListProps> = (props) => {
  return html`<prosekit-combo-box-list ...${forceProps(props)} />`
}

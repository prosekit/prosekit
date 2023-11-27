import '@prosekit/lit/combo-box-input'

import type { ComboBoxInputProps as ComboBoxInputElementProps } from '@prosekit/lit/combo-box-input'
import type { Component } from 'solid-js'
import html from 'solid-js/html'

import type { PropsWithClass, PropsWithChildren } from '../types'
import { forceProps } from '../utils/force-props'

export type ComboBoxInputProps = PropsWithChildren<PropsWithClass<ComboBoxInputElementProps>>

export const ComboBoxInput: Component<ComboBoxInputProps> = (props) => {
  return html`<prosekit-combo-box-input ...${forceProps(props)} />`
}

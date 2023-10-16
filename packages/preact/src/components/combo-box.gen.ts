import '@prosekit/lit/combo-box'
import type { ComboBoxProps as ComboBoxElementProps } from '@prosekit/lit/combo-box'
import type { ComponentChildren, ComponentType } from 'preact'
import { h } from 'preact'

export type ComboBoxProps = {
  class?: string
  children?: ComponentChildren
} & ComboBoxElementProps

export const ComboBox: ComponentType<ComboBoxProps> = (props) => {
  return h('prosekit-combo-box', props)
}

import '@prosekit/lit/combo-box-input'
import type { ComboBoxInputProps as ComboBoxInputElementProps } from '@prosekit/lit/combo-box-input'
import type { ComponentChildren, ComponentType } from 'preact'
import { h } from 'preact'

export type ComboBoxInputProps = {
  class?: string
  children?: ComponentChildren
} & ComboBoxInputElementProps

export const ComboBoxInput: ComponentType<ComboBoxInputProps> = (props) => {
  return h('prosekit-combo-box-input', props)
}

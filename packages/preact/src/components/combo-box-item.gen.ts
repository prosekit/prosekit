import '@prosekit/lit/components/combo-box-item'
import type { ComboBoxItemProps as ComboBoxItemElementProps } from '@prosekit/lit/components/combo-box-item'
import type { ComponentChildren, ComponentType } from 'preact'
import { h } from 'preact'

export type ComboBoxItemProps = {
  class?: string
  children?: ComponentChildren
} & ComboBoxItemElementProps

export const ComboBoxItem: ComponentType<ComboBoxItemProps> = (props) => {
  return h('prosekit-combo-box-item', props)
}

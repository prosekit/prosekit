import '@prosekit/lit/combo-box-list'
import type { ComboBoxListProps as ComboBoxListElementProps } from '@prosekit/lit/combo-box-list'
import type { ComponentChildren, ComponentType } from 'preact'
import { h } from 'preact'

export type ComboBoxListProps = {
  class?: string
  children?: ComponentChildren
} & ComboBoxListElementProps

export const ComboBoxList: ComponentType<ComboBoxListProps> = (props) => {
  return h('prosekit-combo-box-list', props)
}

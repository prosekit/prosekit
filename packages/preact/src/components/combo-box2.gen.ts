import '@prosekit/lit/combo-box2'
import type { ComboBox2Props as ComboBox2ElementProps } from '@prosekit/lit/combo-box2'
import type { ComponentChildren, ComponentType } from 'preact'
import { h } from 'preact'

export type ComboBox2Props = {
  class?: string
  children?: ComponentChildren
} & ComboBox2ElementProps

export const ComboBox2: ComponentType<ComboBox2Props> = (props) => {
  return h('prosekit-combo-box2', props)
}

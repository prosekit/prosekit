import '@prosekit/lit/combo-box-item'
import type { ComboBoxItemProps as ComboBoxItemElementProps } from '@prosekit/lit/combo-box-item'
import type { ComponentType } from 'preact'
import { h } from 'preact'

import type { PropsWithClass, PropsWithChildren } from '../types'

export type ComboBoxItemProps = PropsWithChildren<PropsWithClass<ComboBoxItemElementProps>>

export const ComboBoxItem: ComponentType<ComboBoxItemProps> = (props) => {
  return h('prosekit-combo-box-item', props as object)
}

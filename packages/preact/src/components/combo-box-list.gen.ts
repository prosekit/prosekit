import '@prosekit/lit/combo-box-list'
import type { ComboBoxListProps as ComboBoxListElementProps } from '@prosekit/lit/combo-box-list'
import type { ComponentType } from 'preact'
import { h } from 'preact'

import type { PropsWithClass, PropsWithChildren } from '../types'

export type ComboBoxListProps = PropsWithChildren<PropsWithClass<ComboBoxListElementProps>>

export const ComboBoxList: ComponentType<ComboBoxListProps> = (props) => {
  return h('prosekit-combo-box-list', props)
}

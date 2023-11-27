import '@prosekit/lit/combo-box'
import type { ComboBoxProps as ComboBoxElementProps } from '@prosekit/lit/combo-box'
import type { ComponentType } from 'preact'
import { h } from 'preact'

import type { PropsWithClass, PropsWithChildren } from '../types'

export type ComboBoxProps = PropsWithChildren<PropsWithClass<ComboBoxElementProps>>

export const ComboBox: ComponentType<ComboBoxProps> = (props) => {
  return h('prosekit-combo-box', props)
}

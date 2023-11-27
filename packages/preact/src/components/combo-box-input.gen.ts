import '@prosekit/lit/combo-box-input'
import type { ComboBoxInputProps as ComboBoxInputElementProps } from '@prosekit/lit/combo-box-input'
import type { ComponentType } from 'preact'
import { h } from 'preact'

import type { PropsWithClass, PropsWithChildren } from '../types'

export type ComboBoxInputProps = PropsWithChildren<PropsWithClass<ComboBoxInputElementProps>>

export const ComboBoxInput: ComponentType<ComboBoxInputProps> = (props) => {
  return h('prosekit-combo-box-input', props)
}

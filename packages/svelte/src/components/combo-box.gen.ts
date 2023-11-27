import type { ComboBoxProps as ComboBoxElementProps } from '@prosekit/lit/combo-box'
import type { SvelteComponent } from 'svelte'

import type { PropsWithClass } from '../types'

import ComboBoxComponent from './combo-box.gen.svelte'

export type ComboBoxProps = PropsWithClass<ComboBoxElementProps>

export const ComboBox = ComboBoxComponent as typeof SvelteComponent<any> as typeof SvelteComponent<ComboBoxProps>

import type { ComboBoxInputProps as ComboBoxInputElementProps } from '@prosekit/lit/combo-box-input'
import type { SvelteComponent } from 'svelte'

import type { PropsWithClass } from '../types'

import ComboBoxInputComponent from './combo-box-input.gen.svelte'

export type ComboBoxInputProps = PropsWithClass<ComboBoxInputElementProps>

export const ComboBoxInput = ComboBoxInputComponent as typeof SvelteComponent<any> as typeof SvelteComponent<ComboBoxInputProps>

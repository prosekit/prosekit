import type { ComboBoxInputProps as ComboBoxInputElementProps } from '@prosekit/lit/components/combo-box-input'
import type { SvelteComponent } from 'svelte'

import ComboBoxInputComponent from './combo-box-input.gen.svelte'

export type ComboBoxInputProps = {
  class?: string
} & ComboBoxInputElementProps

export const ComboBoxInput = ComboBoxInputComponent as typeof SvelteComponent<any> as typeof SvelteComponent<ComboBoxInputProps>

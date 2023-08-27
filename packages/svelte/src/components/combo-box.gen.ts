import type { ComboBoxProps as ComboBoxElementProps } from '@prosekit/lit/components/combo-box'
import type { SvelteComponent } from 'svelte'

import ComboBoxComponent from './combo-box.gen.svelte'

export type ComboBoxProps = {
  class?: string
} & ComboBoxElementProps

export const ComboBox = ComboBoxComponent as typeof SvelteComponent<any> as typeof SvelteComponent<ComboBoxProps>

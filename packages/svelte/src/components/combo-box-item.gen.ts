import type { ComboBoxItemProps as ComboBoxItemElementProps } from '@prosekit/lit/combo-box-item'
import type { SvelteComponent } from 'svelte'

import ComboBoxItemComponent from './combo-box-item.gen.svelte'

export type ComboBoxItemProps = {
  class?: string
} & ComboBoxItemElementProps

export const ComboBoxItem = ComboBoxItemComponent as typeof SvelteComponent<any> as typeof SvelteComponent<ComboBoxItemProps>

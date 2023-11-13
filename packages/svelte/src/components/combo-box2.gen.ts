import type { ComboBox2Props as ComboBox2ElementProps } from '@prosekit/lit/combo-box2'
import type { SvelteComponent } from 'svelte'

import ComboBox2Component from './combo-box2.gen.svelte'

export type ComboBox2Props = {
  class?: string
} & ComboBox2ElementProps

export const ComboBox2 = ComboBox2Component as typeof SvelteComponent<any> as typeof SvelteComponent<ComboBox2Props>

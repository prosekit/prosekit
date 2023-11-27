import type { ComboBoxItemProps as ComboBoxItemElementProps } from '@prosekit/lit/combo-box-item'
import type { SvelteComponent } from 'svelte'

import type { PropsWithClass } from '../types'

import ComboBoxItemComponent from './combo-box-item.gen.svelte'

export type ComboBoxItemProps = PropsWithClass<ComboBoxItemElementProps>

export const ComboBoxItem = ComboBoxItemComponent as typeof SvelteComponent<any> as typeof SvelteComponent<ComboBoxItemProps>

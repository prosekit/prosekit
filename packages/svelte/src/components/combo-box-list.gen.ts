import type { ComboBoxListProps as ComboBoxListElementProps } from '@prosekit/lit/combo-box-list'
import type { SvelteComponent } from 'svelte'

import type { PropsWithClass } from '../types'

import ComboBoxListComponent from './combo-box-list.gen.svelte'

export type ComboBoxListProps = PropsWithClass<ComboBoxListElementProps>

export const ComboBoxList = ComboBoxListComponent as typeof SvelteComponent<any> as typeof SvelteComponent<ComboBoxListProps>

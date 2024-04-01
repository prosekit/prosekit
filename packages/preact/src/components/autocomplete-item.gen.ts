import '@prosekit/lit/autocomplete-item'
import type { AutocompleteItemProps as AutocompleteItemElementProps } from '@prosekit/lit/autocomplete-item'
import type { ComponentType } from 'preact'
import { h } from 'preact'

import type { PropsWithClass, PropsWithChildren } from '../types'

export type AutocompleteItemProps = PropsWithChildren<PropsWithClass<AutocompleteItemElementProps>>

export const AutocompleteItem: ComponentType<AutocompleteItemProps> = (props) => {
  return h('prosekit-autocomplete-item', props as object)
}

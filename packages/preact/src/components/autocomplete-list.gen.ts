import '@prosekit/lit/autocomplete-list'
import type { AutocompleteListProps as AutocompleteListElementProps } from '@prosekit/lit/autocomplete-list'
import type { ComponentType } from 'preact'
import { h } from 'preact'

import type { PropsWithClass, PropsWithChildren } from '../types'

export type AutocompleteListProps = PropsWithChildren<PropsWithClass<AutocompleteListElementProps>>

export const AutocompleteList: ComponentType<AutocompleteListProps> = (props) => {
  return h('prosekit-autocomplete-list', props)
}

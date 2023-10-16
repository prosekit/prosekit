import '@prosekit/lit/autocomplete-list'
import type { AutocompleteListProps as AutocompleteListElementProps } from '@prosekit/lit/autocomplete-list'
import type { ComponentChildren, ComponentType } from 'preact'
import { h } from 'preact'

export type AutocompleteListProps = {
  class?: string
  children?: ComponentChildren
} & AutocompleteListElementProps

export const AutocompleteList: ComponentType<AutocompleteListProps> = (props) => {
  return h('prosekit-autocomplete-list', props)
}

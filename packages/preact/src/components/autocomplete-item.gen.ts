import '@prosekit/lit/autocomplete-item'
import type { AutocompleteItemProps as AutocompleteItemElementProps } from '@prosekit/lit/autocomplete-item'
import type { ComponentChildren, ComponentType } from 'preact'
import { h } from 'preact'

export type AutocompleteItemProps = {
  class?: string
  children?: ComponentChildren
} & AutocompleteItemElementProps

export const AutocompleteItem: ComponentType<AutocompleteItemProps> = (props) => {
  return h('prosekit-autocomplete-item', props)
}

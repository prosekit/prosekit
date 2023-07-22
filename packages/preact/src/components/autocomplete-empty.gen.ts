import '@prosekit/lit/components/autocomplete-empty'
import type { AutocompleteEmptyProps as AutocompleteEmptyElementProps } from '@prosekit/lit/components/autocomplete-empty'
import type { ComponentChildren, ComponentType } from 'preact'
import { h } from 'preact'

export type AutocompleteEmptyProps = {
  class?: string
  children?: ComponentChildren
} & AutocompleteEmptyElementProps

export const AutocompleteEmpty: ComponentType<AutocompleteEmptyProps> = (props) => {
  return h('prosekit-autocomplete-empty', props)
}

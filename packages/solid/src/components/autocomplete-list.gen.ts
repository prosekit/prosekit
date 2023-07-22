/* eslint-disable @typescript-eslint/no-namespace */

import '@prosekit/lit/components/autocomplete-list'

import type { AutocompleteListProps as AutocompleteListElementProps } from '@prosekit/lit/components/autocomplete-list'
import type { Component, JSXElement } from 'solid-js'
import h from 'solid-js/h'

export type AutocompleteListProps = {
  class?: string
  children?: JSXElement
} & AutocompleteListElementProps

export const AutocompleteList: Component<AutocompleteListProps> = (props) => {
  return h('prosekit-autocomplete-list', props)
}

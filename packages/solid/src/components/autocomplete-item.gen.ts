/* eslint-disable @typescript-eslint/no-namespace */

import '@prosekit/lit/components/autocomplete-item'

import type { AutocompleteItemProps as AutocompleteItemElementProps } from '@prosekit/lit/components/autocomplete-item'
import type { Component, JSXElement } from 'solid-js'
import h from 'solid-js/h'

export type AutocompleteItemProps = {
  class?: string
  children?: JSXElement
} & AutocompleteItemElementProps

export const AutocompleteItem: Component<AutocompleteItemProps> = (props) => {
  return h('prosekit-autocomplete-item', props)
}

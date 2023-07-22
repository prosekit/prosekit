/* eslint-disable @typescript-eslint/no-namespace */

import '@prosekit/lit/components/autocomplete-empty'

import type { AutocompleteEmptyProps as AutocompleteEmptyElementProps } from '@prosekit/lit/components/autocomplete-empty'
import type { Component, JSXElement } from 'solid-js'
import h from 'solid-js/h'

export type AutocompleteEmptyProps = {
  class?: string
  children?: JSXElement
} & AutocompleteEmptyElementProps

export const AutocompleteEmpty: Component<AutocompleteEmptyProps> = (props) => {
  return h('prosekit-autocomplete-empty', props)
}

/* eslint-disable @typescript-eslint/no-namespace */

import '@prosekit/lit/autocomplete-list'

import type { AutocompleteListProps as AutocompleteListElementProps } from '@prosekit/lit/autocomplete-list'
import type { Component, JSXElement } from 'solid-js'
import html from 'solid-js/html'

export type AutocompleteListProps = {
  class?: string
  children?: JSXElement
} & AutocompleteListElementProps

export const AutocompleteList: Component<AutocompleteListProps> = (props) => {
  return html`<prosekit-autocomplete-list ...${props} />`
}

/* eslint-disable @typescript-eslint/no-namespace */

import '@prosekit/lit/components/autocomplete-item'

import type { AutocompleteItemProps as AutocompleteItemElementProps } from '@prosekit/lit/components/autocomplete-item'
import type { Component, JSXElement } from 'solid-js'
import html from 'solid-js/html'

export type AutocompleteItemProps = {
  class?: string
  children?: JSXElement
} & AutocompleteItemElementProps

export const AutocompleteItem: Component<AutocompleteItemProps> = (props) => {
  return html`<prosekit-autocomplete-item ...${props} />`
}

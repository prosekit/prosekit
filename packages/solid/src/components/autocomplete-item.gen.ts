import '@prosekit/lit/autocomplete-item'

import type { AutocompleteItemProps as AutocompleteItemElementProps } from '@prosekit/lit/autocomplete-item'
import type { Component, JSXElement } from 'solid-js'
import html from 'solid-js/html'

import { forceProps } from '../utils/force-props'

export type AutocompleteItemProps = {
  class?: string
  children?: JSXElement
} & AutocompleteItemElementProps

export const AutocompleteItem: Component<AutocompleteItemProps> = (props) => {
  return html`<prosekit-autocomplete-item ...${forceProps(props)} />`
}

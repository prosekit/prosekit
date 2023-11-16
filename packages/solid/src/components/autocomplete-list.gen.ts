import '@prosekit/lit/autocomplete-list'

import type { AutocompleteListProps as AutocompleteListElementProps } from '@prosekit/lit/autocomplete-list'
import type { Component, JSXElement } from 'solid-js'
import html from 'solid-js/html'

import { forceProps } from '../utils/force-props'

export type AutocompleteListProps = {
  class?: string
  children?: JSXElement
} & AutocompleteListElementProps

export const AutocompleteList: Component<AutocompleteListProps> = (props) => {
  return html`<prosekit-autocomplete-list ...${forceProps(props)} />`
}

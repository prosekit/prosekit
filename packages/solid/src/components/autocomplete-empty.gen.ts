/* eslint-disable @typescript-eslint/no-namespace */

import '@prosekit/lit/autocomplete-empty'

import type { AutocompleteEmptyProps as AutocompleteEmptyElementProps } from '@prosekit/lit/autocomplete-empty'
import type { Component, JSXElement } from 'solid-js'
import html from 'solid-js/html'

export type AutocompleteEmptyProps = {
  class?: string
  children?: JSXElement
} & AutocompleteEmptyElementProps

export const AutocompleteEmpty: Component<AutocompleteEmptyProps> = (props) => {
  return html`<prosekit-autocomplete-empty ...${props} />`
}

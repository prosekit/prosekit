import '@prosekit/lit/autocomplete-item'

import type { AutocompleteItemProps as AutocompleteItemElementProps } from '@prosekit/lit/autocomplete-item'
import type { Component } from 'solid-js'
import html from 'solid-js/html'

import type { PropsWithClass, PropsWithChildren } from '../types'
import { forceProps } from '../utils/force-props'

export type AutocompleteItemProps = PropsWithChildren<PropsWithClass<AutocompleteItemElementProps>>

export const AutocompleteItem: Component<AutocompleteItemProps> = (props) => {
  return html`<prosekit-autocomplete-item ...${forceProps(props)} />`
}

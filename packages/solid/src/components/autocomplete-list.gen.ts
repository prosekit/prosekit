import '@prosekit/lit/autocomplete-list'

import type { AutocompleteListProps as AutocompleteListElementProps } from '@prosekit/lit/autocomplete-list'
import type { Component } from 'solid-js'
import html from 'solid-js/html'

import type { PropsWithClass, PropsWithChildren } from '../types'
import { forceProps } from '../utils/force-props'

export type AutocompleteListProps = PropsWithChildren<PropsWithClass<AutocompleteListElementProps>>

export const AutocompleteList: Component<AutocompleteListProps> = (props) => {
  return html`<prosekit-autocomplete-list ...${forceProps(props)} />`
}

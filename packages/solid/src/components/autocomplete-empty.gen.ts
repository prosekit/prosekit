import '@prosekit/lit/autocomplete-empty'

import type { AutocompleteEmptyProps as AutocompleteEmptyElementProps } from '@prosekit/lit/autocomplete-empty'
import type { Component } from 'solid-js'
import html from 'solid-js/html'

import type { PropsWithClass, PropsWithChildren } from '../types'
import { forceProps } from '../utils/force-props'

export type AutocompleteEmptyProps = PropsWithChildren<PropsWithClass<AutocompleteEmptyElementProps>>

export const AutocompleteEmpty: Component<AutocompleteEmptyProps> = (props) => {
  return html`<prosekit-autocomplete-empty ...${forceProps(props)} />`
}

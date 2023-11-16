import '@prosekit/lit/autocomplete-popover'

import type { AutocompletePopoverProps as AutocompletePopoverElementProps } from '@prosekit/lit/autocomplete-popover'
import type { Component, JSXElement } from 'solid-js'
import html from 'solid-js/html'

import { forceProps } from '../utils/force-props'

export type AutocompletePopoverProps = {
  class?: string
  children?: JSXElement
} & AutocompletePopoverElementProps

export const AutocompletePopover: Component<AutocompletePopoverProps> = (props) => {
  return html`<prosekit-autocomplete-popover ...${forceProps(props)} />`
}

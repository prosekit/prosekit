import '@prosekit/lit/autocomplete-popover'

import type { AutocompletePopoverProps as AutocompletePopoverElementProps } from '@prosekit/lit/autocomplete-popover'
import type { Component } from 'solid-js'
import html from 'solid-js/html'

import type { PropsWithClass, PropsWithChildren } from '../types'
import { forceProps } from '../utils/force-props'

export type AutocompletePopoverProps = PropsWithChildren<PropsWithClass<AutocompletePopoverElementProps>>

export const AutocompletePopover: Component<AutocompletePopoverProps> = (props) => {
  return html`<prosekit-autocomplete-popover ...${forceProps(props)} />`
}

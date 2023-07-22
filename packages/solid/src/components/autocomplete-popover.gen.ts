/* eslint-disable @typescript-eslint/no-namespace */

import '@prosekit/lit/components/autocomplete-popover'

import type { AutocompletePopoverProps as AutocompletePopoverElementProps } from '@prosekit/lit/components/autocomplete-popover'
import type { Component, JSXElement } from 'solid-js'
import h from 'solid-js/h'

export type AutocompletePopoverProps = {
  class?: string
  children?: JSXElement
} & AutocompletePopoverElementProps

export const AutocompletePopover: Component<AutocompletePopoverProps> = (props) => {
  return h('prosekit-autocomplete-popover', props)
}

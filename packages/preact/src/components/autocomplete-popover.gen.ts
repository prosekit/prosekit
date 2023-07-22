import '@prosekit/lit/components/autocomplete-popover'
import type { AutocompletePopoverProps as AutocompletePopoverElementProps } from '@prosekit/lit/components/autocomplete-popover'
import type { ComponentChildren, ComponentType } from 'preact'
import { h } from 'preact'

export type AutocompletePopoverProps = {
  class?: string
  children?: ComponentChildren
} & AutocompletePopoverElementProps

export const AutocompletePopover: ComponentType<AutocompletePopoverProps> = (props) => {
  return h('prosekit-autocomplete-popover', props)
}

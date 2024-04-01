import '@prosekit/lit/autocomplete-popover'
import type { AutocompletePopoverProps as AutocompletePopoverElementProps } from '@prosekit/lit/autocomplete-popover'
import type { ComponentType } from 'preact'
import { h } from 'preact'

import type { PropsWithClass, PropsWithChildren } from '../types'

export type AutocompletePopoverProps = PropsWithChildren<PropsWithClass<AutocompletePopoverElementProps>>

export const AutocompletePopover: ComponentType<AutocompletePopoverProps> = (props) => {
  return h('prosekit-autocomplete-popover', props as object)
}

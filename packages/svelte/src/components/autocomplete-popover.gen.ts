import type { AutocompletePopoverProps as AutocompletePopoverElementProps } from '@prosekit/lit/components/autocomplete-popover'
import type { SvelteComponent } from 'svelte'

import AutocompletePopoverComponent from './autocomplete-popover.gen.svelte'

export type AutocompletePopoverProps = {
  class?: string
} & AutocompletePopoverElementProps

export const AutocompletePopover = AutocompletePopoverComponent as typeof SvelteComponent<any> as typeof SvelteComponent<AutocompletePopoverProps>

import type { AutocompletePopoverProps as AutocompletePopoverElementProps } from '@prosekit/lit/autocomplete-popover'
import type { SvelteComponent } from 'svelte'

import type { PropsWithClass } from '../types'

import AutocompletePopoverComponent from './autocomplete-popover.gen.svelte'

export type AutocompletePopoverProps = PropsWithClass<AutocompletePopoverElementProps>

export const AutocompletePopover = AutocompletePopoverComponent as typeof SvelteComponent<any> as typeof SvelteComponent<AutocompletePopoverProps>

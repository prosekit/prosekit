import type { AutocompletePopoverElement, AutocompletePopoverProps as Props, AutocompletePopoverEvents as Events } from '@prosekit/web/autocomplete'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props.ts'

import Component from './autocomplete-popover.gen.svelte'

/**
 * Props for the {@link AutocompletePopover} component.
 */
export interface AutocompletePopoverProps extends Partial<CreateProps<Props, Events>> {}

export const AutocompletePopover = Component as typeof SvelteComponent<AutocompletePopoverProps & HTMLAttributes<AutocompletePopoverElement>>

import type { AutocompletePopoverElement, AutocompletePopoverProps } from '@prosekit/web/autocomplete'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './autocomplete-popover.gen.svelte'

export const AutocompletePopover = Component as typeof SvelteComponent<Partial<AutocompletePopoverProps> & HTMLAttributes<AutocompletePopoverElement>>

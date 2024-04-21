import type { AutocompletePopoverProps } from '@prosekit/web/autocomplete'    
import type { SvelteComponent } from 'svelte'

import Component from './autocomplete-popover.gen.svelte'

export const AutocompletePopover = Component as typeof SvelteComponent<any> as typeof SvelteComponent<Partial<AutocompletePopoverProps> & {class?: number}>

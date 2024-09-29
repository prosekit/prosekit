import type { AutocompletePopoverElement, AutocompletePopoverProps, AutocompletePopoverEvents } from '@prosekit/web/autocomplete'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './autocomplete-popover.gen.svelte'

export const AutocompletePopover = Component as typeof SvelteComponent<Partial<CreateProps<AutocompletePopoverProps, AutocompletePopoverEvents>> & HTMLAttributes<AutocompletePopoverElement>>

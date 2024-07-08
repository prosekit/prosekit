import type { PopoverTriggerElement, PopoverTriggerProps } from '@prosekit/web/popover'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './popover-trigger.gen.svelte'

export const PopoverTrigger = Component as typeof SvelteComponent<Partial<PopoverTriggerProps> & HTMLAttributes<PopoverTriggerElement>>

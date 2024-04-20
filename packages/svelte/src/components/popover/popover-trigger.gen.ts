import type { PopoverTriggerProps } from '@prosekit/primitives/popover'    
import type { SvelteComponent } from 'svelte'

import Component from './popover-trigger.gen.svelte'

export const PopoverTrigger = Component as typeof SvelteComponent<any> as typeof SvelteComponent<Partial<PopoverTriggerProps> & {class?: number}>

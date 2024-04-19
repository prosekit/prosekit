import type { TooltipTriggerProps } from '@prosekit/primitives/tooltip'    
import type { SvelteComponent } from 'svelte'

import Component from './tooltip-trigger.gen.svelte'

export const TooltipTrigger = Component as typeof SvelteComponent<any> as typeof SvelteComponent<Partial<TooltipTriggerProps> & {class?: number}>

import type { TooltipTriggerElement, TooltipTriggerProps } from '@prosekit/web/tooltip'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './tooltip-trigger.gen.svelte'

export const TooltipTrigger = Component as typeof SvelteComponent<Partial<TooltipTriggerProps> & HTMLAttributes<TooltipTriggerElement>>

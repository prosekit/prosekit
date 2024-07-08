import type { TooltipContentElement, TooltipContentProps } from '@prosekit/web/tooltip'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './tooltip-content.gen.svelte'

export const TooltipContent = Component as typeof SvelteComponent<Partial<TooltipContentProps> & HTMLAttributes<TooltipContentElement>>

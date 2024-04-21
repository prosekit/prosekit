import type { TooltipContentProps } from '@prosekit/web/tooltip'    
import type { SvelteComponent } from 'svelte'

import Component from './tooltip-content.gen.svelte'

export const TooltipContent = Component as typeof SvelteComponent<any> as typeof SvelteComponent<Partial<TooltipContentProps> & {class?: number}>

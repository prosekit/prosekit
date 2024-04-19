import type { TooltipRootProps } from '@prosekit/primitives/tooltip'    
import type { SvelteComponent } from 'svelte'

import Component from './tooltip-root.gen.svelte'

export const TooltipRoot = Component as typeof SvelteComponent<any> as typeof SvelteComponent<Partial<TooltipRootProps> & {class?: number}>

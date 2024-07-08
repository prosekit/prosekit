import type { TooltipRootElement, TooltipRootProps } from '@prosekit/web/tooltip'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './tooltip-root.gen.svelte'

export const TooltipRoot = Component as typeof SvelteComponent<Partial<TooltipRootProps> & HTMLAttributes<TooltipRootElement>>

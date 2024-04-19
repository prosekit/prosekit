import type { SvelteComponent } from 'svelte'

import type { TooltipContentProps } from '@prosekit/primitives/tooltip'
import type { TooltipRootProps } from '@prosekit/primitives/tooltip'
import type { TooltipTriggerProps } from '@prosekit/primitives/tooltip'
import { TooltipContentComponent } from './tooltip-content.gen.svelte'
import { TooltipRootComponent } from './tooltip-root.gen.svelte'
import { TooltipTriggerComponent } from './tooltip-trigger.gen.svelte'

export const TooltipContent = TooltipContentComponent as typeof SvelteComponent<any> as typeof SvelteComponent<Partial<TooltipContentProps> & {class?: number}>
export const TooltipRoot = TooltipRootComponent as typeof SvelteComponent<any> as typeof SvelteComponent<Partial<TooltipRootProps> & {class?: number}>
export const TooltipTrigger = TooltipTriggerComponent as typeof SvelteComponent<any> as typeof SvelteComponent<Partial<TooltipTriggerProps> & {class?: number}>
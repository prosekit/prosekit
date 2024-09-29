import type { TooltipContentElement, TooltipContentProps, TooltipContentEvents } from '@prosekit/web/tooltip'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './tooltip-content.gen.svelte'

export const TooltipContent = Component as typeof SvelteComponent<Partial<CreateProps<TooltipContentProps, TooltipContentEvents>> & HTMLAttributes<TooltipContentElement>>

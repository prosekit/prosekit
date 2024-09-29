import type { TooltipTriggerElement, TooltipTriggerProps, TooltipTriggerEvents } from '@prosekit/web/tooltip'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './tooltip-trigger.gen.svelte'

export const TooltipTrigger = Component as typeof SvelteComponent<Partial<CreateProps<TooltipTriggerProps, TooltipTriggerEvents>> & HTMLAttributes<TooltipTriggerElement>>

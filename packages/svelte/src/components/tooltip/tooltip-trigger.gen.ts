import type { TooltipTriggerElement, TooltipTriggerProps as Props, TooltipTriggerEvents as Events } from '@prosekit/web/tooltip'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './tooltip-trigger.gen.svelte'

/**
 * Props for the {@link TooltipTrigger} component.
 */
export interface TooltipTriggerProps extends Partial<CreateProps<Props, Events>> {}

export const TooltipTrigger = Component as typeof SvelteComponent<TooltipTriggerProps & HTMLAttributes<TooltipTriggerElement>>

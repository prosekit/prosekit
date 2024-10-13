import type { TooltipContentElement, TooltipContentProps as Props, TooltipContentEvents as Events } from '@prosekit/web/tooltip'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './tooltip-content.gen.svelte'

/**
 * Props for the {@link TooltipContent} component.
 */
export interface TooltipContentProps extends Partial<CreateProps<Props, Events>> {}

export const TooltipContent = Component as typeof SvelteComponent<TooltipContentProps & HTMLAttributes<TooltipContentElement>>

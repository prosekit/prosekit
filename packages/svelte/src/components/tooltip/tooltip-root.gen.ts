import type { TooltipRootElement, TooltipRootProps as Props, TooltipRootEvents as Events } from '@prosekit/web/tooltip'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './tooltip-root.gen.svelte'

/**
 * Props for the {@link TooltipRoot} component.
 */
export interface TooltipRootProps extends Partial<CreateProps<Props, Events>> {}

export const TooltipRoot = Component as typeof SvelteComponent<TooltipRootProps & HTMLAttributes<TooltipRootElement>>

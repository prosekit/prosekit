import type { TooltipRootElement, TooltipRootProps, TooltipRootEvents } from '@prosekit/web/tooltip'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './tooltip-root.gen.svelte'

export const TooltipRoot = Component as typeof SvelteComponent<Partial<CreateProps<TooltipRootProps, TooltipRootEvents>> & HTMLAttributes<TooltipRootElement>>

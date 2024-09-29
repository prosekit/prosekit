import type { PopoverTriggerElement, PopoverTriggerProps, PopoverTriggerEvents } from '@prosekit/web/popover'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './popover-trigger.gen.svelte'

export const PopoverTrigger = Component as typeof SvelteComponent<Partial<CreateProps<PopoverTriggerProps, PopoverTriggerEvents>> & HTMLAttributes<PopoverTriggerElement>>

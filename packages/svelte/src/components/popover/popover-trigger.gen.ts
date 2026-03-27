import type { PopoverTriggerElement, PopoverTriggerProps as Props, PopoverTriggerEvents as Events } from '@prosekit/web/popover'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props.ts'

import Component from './popover-trigger.gen.svelte'

/**
 * Props for the {@link PopoverTrigger} component.
 */
export interface PopoverTriggerProps extends Partial<CreateProps<Props, Events>> {}

export const PopoverTrigger = Component as typeof SvelteComponent<PopoverTriggerProps & HTMLAttributes<PopoverTriggerElement>>

import type { PopoverContentElement, PopoverContentProps as Props, PopoverContentEvents as Events } from '@prosekit/web/popover'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props.ts'

import Component from './popover-content.gen.svelte'

/**
 * Props for the {@link PopoverContent} component.
 */
export interface PopoverContentProps extends Partial<CreateProps<Props, Events>> {}

export const PopoverContent = Component as typeof SvelteComponent<PopoverContentProps & HTMLAttributes<PopoverContentElement>>

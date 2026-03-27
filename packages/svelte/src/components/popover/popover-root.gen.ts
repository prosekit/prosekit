import type { PopoverRootElement, PopoverRootProps as Props, PopoverRootEvents as Events } from '@prosekit/web/popover'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props.ts'

import Component from './popover-root.gen.svelte'

/**
 * Props for the {@link PopoverRoot} component.
 */
export interface PopoverRootProps extends Partial<CreateProps<Props, Events>> {}

export const PopoverRoot = Component as typeof SvelteComponent<PopoverRootProps & HTMLAttributes<PopoverRootElement>>

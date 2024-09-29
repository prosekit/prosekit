import type { PopoverContentElement, PopoverContentProps, PopoverContentEvents } from '@prosekit/web/popover'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './popover-content.gen.svelte'

export const PopoverContent = Component as typeof SvelteComponent<Partial<CreateProps<PopoverContentProps, PopoverContentEvents>> & HTMLAttributes<PopoverContentElement>>

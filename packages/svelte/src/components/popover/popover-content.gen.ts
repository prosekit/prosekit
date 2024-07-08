import type { PopoverContentElement, PopoverContentProps } from '@prosekit/web/popover'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './popover-content.gen.svelte'

export const PopoverContent = Component as typeof SvelteComponent<Partial<PopoverContentProps> & HTMLAttributes<PopoverContentElement>>

import type { PopoverContentProps } from '@prosekit/primitives/popover'    
import type { SvelteComponent } from 'svelte'

import Component from './popover-content.gen.svelte'

export const PopoverContent = Component as typeof SvelteComponent<any> as typeof SvelteComponent<Partial<PopoverContentProps> & {class?: number}>

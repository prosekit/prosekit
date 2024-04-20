import type { PopoverRootProps } from '@prosekit/primitives/popover'    
import type { SvelteComponent } from 'svelte'

import Component from './popover-root.gen.svelte'

export const PopoverRoot = Component as typeof SvelteComponent<any> as typeof SvelteComponent<Partial<PopoverRootProps> & {class?: number}>

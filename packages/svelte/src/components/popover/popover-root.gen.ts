import type { PopoverRootElement, PopoverRootProps } from '@prosekit/web/popover'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './popover-root.gen.svelte'

export const PopoverRoot = Component as typeof SvelteComponent<Partial<PopoverRootProps> & HTMLAttributes<PopoverRootElement>>

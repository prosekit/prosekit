import type { BlockPopoverElement, BlockPopoverProps } from '@prosekit/web/block-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './block-popover.gen.svelte'

export const BlockPopover = Component as typeof SvelteComponent<Partial<BlockPopoverProps> & HTMLAttributes<BlockPopoverElement>>

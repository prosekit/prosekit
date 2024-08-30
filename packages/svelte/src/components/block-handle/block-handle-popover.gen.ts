import type { BlockHandlePopoverElement, BlockHandlePopoverProps } from '@prosekit/web/block-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './block-handle-popover.gen.svelte'

export const BlockHandlePopover = Component as typeof SvelteComponent<Partial<BlockHandlePopoverProps> & HTMLAttributes<BlockHandlePopoverElement>>

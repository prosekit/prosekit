import type { BlockDragHandleElement, BlockDragHandleProps } from '@prosekit/web/block-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './block-drag-handle.gen.svelte'

export const BlockDragHandle = Component as typeof SvelteComponent<Partial<BlockDragHandleProps> & HTMLAttributes<BlockDragHandleElement>>

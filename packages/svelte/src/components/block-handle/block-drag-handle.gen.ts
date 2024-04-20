import type { BlockDragHandleProps } from '@prosekit/primitives/block-handle'    
import type { SvelteComponent } from 'svelte'

import Component from './block-drag-handle.gen.svelte'

export const BlockDragHandle = Component as typeof SvelteComponent<any> as typeof SvelteComponent<Partial<BlockDragHandleProps> & {class?: number}>

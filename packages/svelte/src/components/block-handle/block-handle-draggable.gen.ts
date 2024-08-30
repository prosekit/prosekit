import type { BlockHandleDraggableElement, BlockHandleDraggableProps } from '@prosekit/web/block-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './block-handle-draggable.gen.svelte'

export const BlockHandleDraggable = Component as typeof SvelteComponent<Partial<BlockHandleDraggableProps> & HTMLAttributes<BlockHandleDraggableElement>>

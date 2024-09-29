import type { BlockHandleDraggableElement, BlockHandleDraggableProps, BlockHandleDraggableEvents } from '@prosekit/web/block-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './block-handle-draggable.gen.svelte'

export const BlockHandleDraggable = Component as typeof SvelteComponent<Partial<CreateProps<BlockHandleDraggableProps, BlockHandleDraggableEvents>> & HTMLAttributes<BlockHandleDraggableElement>>

import type { BlockHandleDraggableElement, BlockHandleDraggableProps as Props, BlockHandleDraggableEvents as Events } from '@prosekit/web/block-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props.ts'

import Component from './block-handle-draggable.gen.svelte'

/**
 * Props for the {@link BlockHandleDraggable} component.
 */
export interface BlockHandleDraggableProps extends Partial<CreateProps<Props, Events>> {}

export const BlockHandleDraggable = Component as typeof SvelteComponent<BlockHandleDraggableProps & HTMLAttributes<BlockHandleDraggableElement>>

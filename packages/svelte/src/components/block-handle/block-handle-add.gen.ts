import type { BlockHandleAddElement, BlockHandleAddProps as Props, BlockHandleAddEvents as Events } from '@prosekit/web/block-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './block-handle-add.gen.svelte'

/**
 * Props for the {@link BlockHandleAdd} component.
 */
export interface BlockHandleAddProps extends Partial<CreateProps<Props, Events>> {}

export const BlockHandleAdd = Component as typeof SvelteComponent<BlockHandleAddProps & HTMLAttributes<BlockHandleAddElement>>

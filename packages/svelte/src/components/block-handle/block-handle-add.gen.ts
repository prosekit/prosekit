import type { BlockHandleAddElement, BlockHandleAddProps, BlockHandleAddEvents } from '@prosekit/web/block-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './block-handle-add.gen.svelte'

export const BlockHandleAdd = Component as typeof SvelteComponent<Partial<CreateProps<BlockHandleAddProps, BlockHandleAddEvents>> & HTMLAttributes<BlockHandleAddElement>>

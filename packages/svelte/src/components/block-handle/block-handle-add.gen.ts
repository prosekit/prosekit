import type { BlockHandleAddElement, BlockHandleAddProps } from '@prosekit/web/block-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './block-handle-add.gen.svelte'

export const BlockHandleAdd = Component as typeof SvelteComponent<Partial<BlockHandleAddProps> & HTMLAttributes<BlockHandleAddElement>>

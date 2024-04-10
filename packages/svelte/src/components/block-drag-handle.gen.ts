import type { BlockDragHandleProps as BlockDragHandleElementProps } from '@prosekit/lit/block-drag-handle'
import type { SvelteComponent } from 'svelte'

import type { PropsWithClass } from '../types'

import BlockDragHandleComponent from './block-drag-handle.gen.svelte'

export type BlockDragHandleProps = PropsWithClass<BlockDragHandleElementProps>

export const BlockDragHandle = BlockDragHandleComponent as typeof SvelteComponent<any> as typeof SvelteComponent<BlockDragHandleProps>

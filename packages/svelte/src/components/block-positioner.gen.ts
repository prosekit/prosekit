import type { BlockPositionerProps as BlockPositionerElementProps } from '@prosekit/lit/block-positioner'
import type { SvelteComponent } from 'svelte'

import type { PropsWithClass } from '../types'

import BlockPositionerComponent from './block-positioner.gen.svelte'

export type BlockPositionerProps = PropsWithClass<BlockPositionerElementProps>

export const BlockPositioner = BlockPositionerComponent as typeof SvelteComponent<any> as typeof SvelteComponent<BlockPositionerProps>

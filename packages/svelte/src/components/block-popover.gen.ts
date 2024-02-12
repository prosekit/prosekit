import type { BlockPopoverProps as BlockPopoverElementProps } from '@prosekit/lit/block-popover'
import type { SvelteComponent } from 'svelte'

import type { PropsWithClass } from '../types'

import BlockPopoverComponent from './block-popover.gen.svelte'

export type BlockPopoverProps = PropsWithClass<BlockPopoverElementProps>

export const BlockPopover = BlockPopoverComponent as typeof SvelteComponent<any> as typeof SvelteComponent<BlockPopoverProps>

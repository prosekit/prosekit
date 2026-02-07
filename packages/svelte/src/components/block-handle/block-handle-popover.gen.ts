import type { BlockHandlePopoverElement, BlockHandlePopoverProps as Props, BlockHandlePopoverEvents as Events } from '@prosekit/web/block-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props.ts'

import Component from './block-handle-popover.gen.svelte'

/**
 * Props for the {@link BlockHandlePopover} component.
 */
export interface BlockHandlePopoverProps extends Partial<CreateProps<Props, Events>> {}

export const BlockHandlePopover = Component as typeof SvelteComponent<BlockHandlePopoverProps & HTMLAttributes<BlockHandlePopoverElement>>

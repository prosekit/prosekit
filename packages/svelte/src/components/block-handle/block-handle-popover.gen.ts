import type { BlockHandlePopoverElement, BlockHandlePopoverProps, BlockHandlePopoverEvents } from '@prosekit/web/block-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './block-handle-popover.gen.svelte'

export const BlockHandlePopover = Component as typeof SvelteComponent<Partial<CreateProps<BlockHandlePopoverProps, BlockHandlePopoverEvents>> & HTMLAttributes<BlockHandlePopoverElement>>

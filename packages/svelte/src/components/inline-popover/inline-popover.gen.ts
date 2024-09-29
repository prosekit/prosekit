import type { InlinePopoverElement, InlinePopoverProps, InlinePopoverEvents } from '@prosekit/web/inline-popover'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './inline-popover.gen.svelte'

export const InlinePopover = Component as typeof SvelteComponent<Partial<CreateProps<InlinePopoverProps, InlinePopoverEvents>> & HTMLAttributes<InlinePopoverElement>>

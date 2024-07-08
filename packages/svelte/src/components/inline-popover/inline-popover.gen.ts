import type { InlinePopoverElement, InlinePopoverProps } from '@prosekit/web/inline-popover'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './inline-popover.gen.svelte'

export const InlinePopover = Component as typeof SvelteComponent<Partial<InlinePopoverProps> & HTMLAttributes<InlinePopoverElement>>

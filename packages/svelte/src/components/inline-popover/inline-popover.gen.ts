import type { InlinePopoverProps } from '@prosekit/web/inline-popover'    
import type { SvelteComponent } from 'svelte'

import Component from './inline-popover.gen.svelte'

export const InlinePopover = Component as typeof SvelteComponent<any> as typeof SvelteComponent<Partial<InlinePopoverProps> & {class?: string}>

import type { TableRowPopoverTriggerElement, TableRowPopoverTriggerProps } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './table-row-popover-trigger.gen.svelte'

export const TableRowPopoverTrigger = Component as typeof SvelteComponent<Partial<TableRowPopoverTriggerProps> & HTMLAttributes<TableRowPopoverTriggerElement>>

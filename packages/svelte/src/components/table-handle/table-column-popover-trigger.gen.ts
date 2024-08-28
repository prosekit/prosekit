import type { TableColumnPopoverTriggerElement, TableColumnPopoverTriggerProps } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './table-column-popover-trigger.gen.svelte'

export const TableColumnPopoverTrigger = Component as typeof SvelteComponent<Partial<TableColumnPopoverTriggerProps> & HTMLAttributes<TableColumnPopoverTriggerElement>>

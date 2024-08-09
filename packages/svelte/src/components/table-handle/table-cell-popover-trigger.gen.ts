import type { TableCellPopoverTriggerElement, TableCellPopoverTriggerProps } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './table-cell-popover-trigger.gen.svelte'

export const TableCellPopoverTrigger = Component as typeof SvelteComponent<Partial<TableCellPopoverTriggerProps> & HTMLAttributes<TableCellPopoverTriggerElement>>

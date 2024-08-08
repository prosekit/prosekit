import type { TableCellPopoverContentElement, TableCellPopoverContentProps } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './table-cell-popover-content.gen.svelte'

export const TableCellPopoverContent = Component as typeof SvelteComponent<Partial<TableCellPopoverContentProps> & HTMLAttributes<TableCellPopoverContentElement>>

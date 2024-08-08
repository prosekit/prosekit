import type { TableCellPopoverElement, TableCellPopoverProps } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './table-cell-popover.gen.svelte'

export const TableCellPopover = Component as typeof SvelteComponent<Partial<TableCellPopoverProps> & HTMLAttributes<TableCellPopoverElement>>

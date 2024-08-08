import type { TableCellPopoverItemElement, TableCellPopoverItemProps } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './table-cell-popover-item.gen.svelte'

export const TableCellPopoverItem = Component as typeof SvelteComponent<Partial<TableCellPopoverItemProps> & HTMLAttributes<TableCellPopoverItemElement>>

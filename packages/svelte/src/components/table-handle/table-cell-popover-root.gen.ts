import type { TableCellPopoverRootElement, TableCellPopoverRootProps } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './table-cell-popover-root.gen.svelte'

export const TableCellPopoverRoot = Component as typeof SvelteComponent<Partial<TableCellPopoverRootProps> & HTMLAttributes<TableCellPopoverRootElement>>

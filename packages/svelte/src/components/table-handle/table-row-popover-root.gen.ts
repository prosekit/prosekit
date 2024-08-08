import type { TableRowPopoverRootElement, TableRowPopoverRootProps } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './table-row-popover-root.gen.svelte'

export const TableRowPopoverRoot = Component as typeof SvelteComponent<Partial<TableRowPopoverRootProps> & HTMLAttributes<TableRowPopoverRootElement>>

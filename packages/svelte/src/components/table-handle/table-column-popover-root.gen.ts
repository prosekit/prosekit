import type { TableColumnPopoverRootElement, TableColumnPopoverRootProps } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './table-column-popover-root.gen.svelte'

export const TableColumnPopoverRoot = Component as typeof SvelteComponent<Partial<TableColumnPopoverRootProps> & HTMLAttributes<TableColumnPopoverRootElement>>

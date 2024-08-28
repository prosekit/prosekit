import type { TableHandlePopoverContentElement, TableHandlePopoverContentProps } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './table-handle-popover-content.gen.svelte'

export const TableHandlePopoverContent = Component as typeof SvelteComponent<Partial<TableHandlePopoverContentProps> & HTMLAttributes<TableHandlePopoverContentElement>>

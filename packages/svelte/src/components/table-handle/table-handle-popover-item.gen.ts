import type { TableHandlePopoverItemElement, TableHandlePopoverItemProps } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './table-handle-popover-item.gen.svelte'

export const TableHandlePopoverItem = Component as typeof SvelteComponent<Partial<TableHandlePopoverItemProps> & HTMLAttributes<TableHandlePopoverItemElement>>

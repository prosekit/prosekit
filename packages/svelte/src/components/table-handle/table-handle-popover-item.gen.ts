import type { TableHandlePopoverItemElement, TableHandlePopoverItemProps, TableHandlePopoverItemEvents } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './table-handle-popover-item.gen.svelte'

export const TableHandlePopoverItem = Component as typeof SvelteComponent<Partial<CreateProps<TableHandlePopoverItemProps, TableHandlePopoverItemEvents>> & HTMLAttributes<TableHandlePopoverItemElement>>

import type { TableHandlePopoverContentElement, TableHandlePopoverContentProps, TableHandlePopoverContentEvents } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './table-handle-popover-content.gen.svelte'

export const TableHandlePopoverContent = Component as typeof SvelteComponent<Partial<CreateProps<TableHandlePopoverContentProps, TableHandlePopoverContentEvents>> & HTMLAttributes<TableHandlePopoverContentElement>>

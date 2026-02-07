import type { TableHandlePopoverItemElement, TableHandlePopoverItemProps as Props, TableHandlePopoverItemEvents as Events } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props.ts'

import Component from './table-handle-popover-item.gen.svelte'

/**
 * Props for the {@link TableHandlePopoverItem} component.
 */
export interface TableHandlePopoverItemProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandlePopoverItem = Component as typeof SvelteComponent<TableHandlePopoverItemProps & HTMLAttributes<TableHandlePopoverItemElement>>

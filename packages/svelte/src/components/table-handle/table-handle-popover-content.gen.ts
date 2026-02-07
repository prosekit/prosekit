import type { TableHandlePopoverContentElement, TableHandlePopoverContentProps as Props, TableHandlePopoverContentEvents as Events } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props.ts'

import Component from './table-handle-popover-content.gen.svelte'

/**
 * Props for the {@link TableHandlePopoverContent} component.
 */
export interface TableHandlePopoverContentProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandlePopoverContent = Component as typeof SvelteComponent<TableHandlePopoverContentProps & HTMLAttributes<TableHandlePopoverContentElement>>

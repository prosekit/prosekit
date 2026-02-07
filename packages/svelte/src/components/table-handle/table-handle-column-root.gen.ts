import type { TableHandleColumnRootElement, TableHandleColumnRootProps as Props, TableHandleColumnRootEvents as Events } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './table-handle-column-root.gen.svelte'

/**
 * Props for the {@link TableHandleColumnRoot} component.
 */
export interface TableHandleColumnRootProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandleColumnRoot = Component as typeof SvelteComponent<TableHandleColumnRootProps & HTMLAttributes<TableHandleColumnRootElement>>

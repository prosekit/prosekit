import type { TableHandleRowRootElement, TableHandleRowRootProps as Props, TableHandleRowRootEvents as Events } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props.ts'

import Component from './table-handle-row-root.gen.svelte'

/**
 * Props for the {@link TableHandleRowRoot} component.
 */
export interface TableHandleRowRootProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandleRowRoot = Component as typeof SvelteComponent<TableHandleRowRootProps & HTMLAttributes<TableHandleRowRootElement>>

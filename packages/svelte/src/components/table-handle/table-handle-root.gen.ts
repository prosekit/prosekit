import type { TableHandleRootElement, TableHandleRootProps as Props, TableHandleRootEvents as Events } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props.ts'

import Component from './table-handle-root.gen.svelte'

/**
 * Props for the {@link TableHandleRoot} component.
 */
export interface TableHandleRootProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandleRoot = Component as typeof SvelteComponent<TableHandleRootProps & HTMLAttributes<TableHandleRootElement>>

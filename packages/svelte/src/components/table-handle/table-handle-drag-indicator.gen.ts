import type { TableHandleDragIndicatorElement, TableHandleDragIndicatorProps as Props, TableHandleDragIndicatorEvents as Events } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './table-handle-drag-indicator.gen.svelte'

/**
 * Props for the {@link TableHandleDragIndicator} component.
 */
export interface TableHandleDragIndicatorProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandleDragIndicator = Component as typeof SvelteComponent<TableHandleDragIndicatorProps & HTMLAttributes<TableHandleDragIndicatorElement>>

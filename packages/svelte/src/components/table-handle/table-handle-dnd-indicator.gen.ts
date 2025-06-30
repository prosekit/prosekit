import type { TableHandleDndIndicatorElement, TableHandleDndIndicatorProps as Props, TableHandleDndIndicatorEvents as Events } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './table-handle-dnd-indicator.gen.svelte'

/**
 * Props for the {@link TableHandleDndIndicator} component.
 */
export interface TableHandleDndIndicatorProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandleDndIndicator = Component as typeof SvelteComponent<TableHandleDndIndicatorProps & HTMLAttributes<TableHandleDndIndicatorElement>>

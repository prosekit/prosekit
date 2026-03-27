import type { TableHandleDropIndicatorElement, TableHandleDropIndicatorProps as Props, TableHandleDropIndicatorEvents as Events } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props.ts'

import Component from './table-handle-drop-indicator.gen.svelte'

/**
 * Props for the {@link TableHandleDropIndicator} component.
 */
export interface TableHandleDropIndicatorProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandleDropIndicator = Component as typeof SvelteComponent<TableHandleDropIndicatorProps & HTMLAttributes<TableHandleDropIndicatorElement>>

import type { TableHandleDragPreviewElement, TableHandleDragPreviewProps as Props, TableHandleDragPreviewEvents as Events } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './table-handle-drag-preview.gen.svelte'

/**
 * Props for the {@link TableHandleDragPreview} component.
 */
export interface TableHandleDragPreviewProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandleDragPreview = Component as typeof SvelteComponent<TableHandleDragPreviewProps & HTMLAttributes<TableHandleDragPreviewElement>>

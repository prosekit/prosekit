import type { TableHandleDndPreviewElement, TableHandleDndPreviewProps as Props, TableHandleDndPreviewEvents as Events } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './table-handle-dnd-preview.gen.svelte'

/**
 * Props for the {@link TableHandleDndPreview} component.
 */
export interface TableHandleDndPreviewProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandleDndPreview = Component as typeof SvelteComponent<TableHandleDndPreviewProps & HTMLAttributes<TableHandleDndPreviewElement>>

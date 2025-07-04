import type { TableHandleDropCursorElement, TableHandleDropCursorProps as Props, TableHandleDropCursorEvents as Events } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './table-handle-drop-cursor.gen.svelte'

/**
 * Props for the {@link TableHandleDropCursor} component.
 */
export interface TableHandleDropCursorProps extends Partial<CreateProps<Props, Events>> {}

export const TableHandleDropCursor = Component as typeof SvelteComponent<TableHandleDropCursorProps & HTMLAttributes<TableHandleDropCursorElement>>
